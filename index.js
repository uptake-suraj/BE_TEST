const express = require('express');
const { connection } = require('./postgres/postgres');
// const userRoutes = require('./routes/userRoutes'); 
const { router } = require('./view/routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(router); 

(async () => {
  await connection();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();
