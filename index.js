const express = require('express');
const { connection } = require('./postgres/postgres');
const { router } = require('./view/routes');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })); 

app.use("/api", router);



(async () => {
  await connection();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();
