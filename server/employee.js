import express, { response } from "express"
const router =express.Router();
import db from "./db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

router.post("/get_Employe",(req,res)=>{
  const email=req.body.email;
  // console.log(email)
const sql = "SELECT * FROM employee WHERE email=?"

db.query(sql, [email], (err, result) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ status: false, err: err });
  }

  // Check if user exists
  if (result.length === 0) {
    return res.status(400).json({ status: false, err: "Invalid Credentials" });
  }

  // console.log(result[0].password);

  bcrypt.compare(req.body.password, result[0].password, (err, response) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: false, err: "Server Error" });
    }

    if (!response) {
      return res.status(400).json({ status: false, err: "Wrong Password" });
    }

    const email = result[0].email;
    const token = jwt.sign(
      { role: "employee", Email: email, id: result[0].id }, // Fixed ID issue
      "jwt_secret_key",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      loginStatus: true,
      msg: "Login successful!",
      result: result,
    });
  });
});





});

router.get("/detail_emp/:id" ,(req,res)=>{
  const {id} = req.params
  // console.log(req.params);
  // console.log("greate",id);
  const sql = "SELECT * FROM employee WHERE id=?"
  db.query(sql,[id],(err,result)=>{
    if(err){
      console.log(err)
     return res.status(400).json({status:false, err:err })
    }
    return res.status(200).json({status:true, result:result})
  })

});

router.get("/logout" , (req, res)=>{
res.clearCookie("token");
res.status(200).json({status:true , msg:"logout success."})
})
export { router as employeeRoute};