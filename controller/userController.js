const { getUserModal } = require("../postgres/postgres");

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
const updateEmp = async (req,res) => {
    let empId = req.params.empId;
    
    try {
        const UserModal = getUserModal();
        const emp  =await UserModal.update(req.body,{where:{empId}});
        if(emp[0] === 0 ) {
            return res.status(404).json({message : "Employee not found"});
        }
    return res.status(200).json({message : "Employee updated successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: "Internal server error" });
        
    }
}

// delete Employee
const deleteEmp = async (req,res)=>{
    let empId = req.params.empId;
    try {
        const UserModal = getUserModal();
        const emp  = await UserModal.findOne({where:{empId}});
        if(emp === null ) {
            return res.status(404).json({message : "Employee not found"});
        }
        await emp.destroy();
        return res.status(200).json({message : "Employee deleted successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: "Internal server error" });
        
    }
}

module.exports = {
  getAllEmp,
  addEmp,
  updateEmp,
  deleteEmp
};
