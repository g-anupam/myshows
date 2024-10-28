const express = require("express");
const {connectToDatabase} = require("./database/db");
const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase();

app.get('/',(req,res) => {
  res.send("Mongo DB native Driver up and running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})  
