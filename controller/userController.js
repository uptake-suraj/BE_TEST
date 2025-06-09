const { getUserModal, getLoginUserModal } = require("../postgres/postgres");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("./auth/auth");

// Get All Employee
const getAllEmp = async (req, res) => {
  try {
    const UserModal = getUserModal();
    const users = await UserModal.findAll();

    if (users.length === 0) {
      return res.status(200).json({ error: "No data found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: "Internal server error" });
  }
};

// Add Employee
const addEmp = async (req, res) => {
  const { name, email, desiganation, empId } = req.body;
  try {
    const UserModal = getUserModal();
    const emp = await UserModal.findOne({ where: { empId: empId } });
    if (emp === null) {
      await UserModal.create(req.body);
      return res.status(201).json({ message: "Emp created successfully" });
    } else {
      return res.status(400).json({ message: "Emp already exists" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: "Internal server error" });
  }
};

// Update Employee
const updateEmp = async (req, res) => {
  let empId = req.params.empId;

  try {
    const UserModal = getUserModal();
    const emp = await UserModal.update(req.body, { where: { empId } });
    if (emp[0] === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: "Internal server error" });
  }
};

// delete Employee
const deleteEmp = async (req, res) => {
  let empId = req.params.empId;
  try {
    const UserModal = getUserModal();
    const emp = await UserModal.findOne({ where: { empId } });
    if (emp === null) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await emp.destroy();
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: "Internal server error" });
  }
};

// for register
const registerController = async (req, res) => {
  const { userName, email, password } = req.body;
  const UserLoginModals = getLoginUserModal();

  const exitUser = await UserLoginModals.findOne({
    where: { userName: userName },
  });
  if (exitUser !== null) {
    return res.status(409).json({ message: "Username already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserLoginModals.create({
      ...req.body,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User created successfully",
      //  user,
      userData: {
        userName,
        email,
      },
    });
  }
};

const loginController = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const UserLoginModals = getLoginUserModal();
    const exist = await UserLoginModals.findOne({
      where: { userName: userName },
    });

    if (exist !== null) {
      const isValid = await bcrypt.compare(password, exist.password);
      if (!isValid) {
        return res.status(401).json({ message: "Credentials are incorrect" });
      }
      // console.log(exist.dataValues)
      const accessToken = await generateAccessToken(exist.dataValues);
      const refreshToken = await generateRefreshToken(exist.dataValues);
      exist.update({ refreshtoken: refreshToken });
      res.cookie(
        "refreshtoken",
        refreshToken,
        { httpOnly: true },
        { secure: true }
      );
      return res.status(200).json({
        message: "Login Successful",
        user: exist,
        userData: {
          userName: exist.dataValues.userName,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    "Internal server error:", error;
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshtoken;
  try {
    if (!refreshToken) {
      return res.status(403).json("Token is empty ");
    }

    const user = await UserLoginModals.findOne({
      where: { refreshtoken: refreshToken },
    });
    jwt.verify(refreshToken, "cdef", async (error, decoded) => {
      if (error) {
        res.status(403).json("Token is invalid");
      }
      const token = await generateAccessToken(user.dataValues);
      return res.status(200).json({
        accessToken: token,
      });
    });
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

// Log out
const logoutController = async (req, res) => {
  const refreshToken = req.cookies.refreshtoken;
  if (!refreshToken) {
    return res.status(403).json("Token is empty ");
  }
  const user = await getLoginUserModal().findOne({
    where: { refreshtoken: refreshToken },
  });
  if (user !== null) {
    user.update({ refreshtoken: null });
  }
  res.clearCookie("refreshtoken");
  return res.status(200).json("Logged out successfully");
};

// Profile
const profileController = async (req, res) => {};

module.exports = {
  getAllEmp,
  addEmp,
  updateEmp,
  deleteEmp,
  registerController,
  loginController,
  refreshController,
  logoutController,
  profileController
};
