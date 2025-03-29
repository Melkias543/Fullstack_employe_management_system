import Mysql from 'mysql2'; 
const db=Mysql.createConnection({
  database: "employeems",
  user: "milk@apo",
  password: "12345678",
  host: "localhost",
});

db.connect((err,res)=>{
  if(err){
    console.log(err)
  }
  console.log("database connection is success")
})
export default db;