import express, { json } from 'express';
import db from './db.js';
import jwt from "jsonwebtoken"
const router = express.Router();
import multer from "multer"
import path from "path"
import bcrpt from "bcrypt"


router.post("/getAdmin", (req, res) => {
  const {email,password} =req.body

const sql = "SELECT * FROM admin WHERE email=? and password=? ";

db.query(sql, [email,password], (err, result) => {
  if (err) {
    console.log(err);
    return res.status(500).json({ err });

  }
  if(result.length >0){
    const email = result[0].email;
    const id = result[0].id;
    // console.log(email)
const token = jwt.sign({role:"admin", Email:email, id:id},"process.env.SCREET_KEY", {expiresIn:"1d"}); 
// console.log(token)
res.cookie("token", token);
res.status(200).json({ loginStatus: true, msg: "Login successful!" });

 } else {
res.status(201).json({msg: "Wrong Credential"})
 }

});


})

router.post("/add_category", (req, res) => {
  const { category } = req.body;

 
  if (!category) {
    return res.status(400).json({ error: "Category name is required" });
  }

  const sql = "INSERT INTO category (cat_name) VALUES (?)";

  db.query(sql, [category], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database Error", details: err });
    }

    res.status(201).json({ message: "Category added successfully", result });
  });
});



router.get("/catagory_list", (req,res)=>{

const sql = "SELECT * FROM category";

db.query(sql, (err,result)=>{
  if(err){
    console.log(err)
    return res.status(201).json({status:false ,Error:err})
  }
  else{
    res.status(200).json({status:true, result:result})
  }
})


})


router.delete("/delete_cat/:id", (req,res)=>{
  const {id} = req.params
  console.log(id)
  const sql = "DELETE FROM category WHERE id = ?";
  db.query(sql, [id] ,(err,result)=>{
    if(err){
      console.log(err);
      res.json({status:false , err:err})

    }
    res.status(200).json({ status: true, result:"Data is Deleted Successfully." });
  })


});




// image upload
const storage= multer.diskStorage({
  destination:(req,res,cb)=>{
    cb(null, "public/image")
  },
  filename:(req,file,cb)=>{
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
})
const upload =multer({
  storage:storage
})




router.post("/add_employee", upload.single("image"),(req,res)=>{
const sql =
  "INSERT INTO employee (name, email, password, address, category_id, salary, image) VALUES (?, ?, ?, ?, ?, ?, ?)";

const saltRounds = 10;
 const salt = bcrpt.genSaltSync(saltRounds);
 const hash = bcrpt.hashSync(req.body.password, salt);
// console.log(hash);

  const values = [
    req.body.name,
    req.body.email,
    hash,
    req.body.address,
    req.body.category_id,
    req.body.salary,
    req.file ? req.file.filename : null,
  ];
console.log(values)


db.query(sql, [...values],(err,result)=>{
  if(err){
    console.log(err)
    return res.status(400).json({msg:"database error", status:false ,err:"All fields required"})
  }
  else{
  return  res.status(200).json({msg:"employes saved" , status:true, result:result})
  }
} )
})

router.get("/get_Employee" , (req,res)=>{
  const sql = "SELECT * FROM employee ";
  db.query(sql, (err,result)=>{
    if(err){
      console.log(err)
      return res.status(400).json({status:false, error:err})
    }
    return res.status(200).json({status:true , result})
  })
});



router.delete("/delete_employe/:id", (req,res)=>{
  const {id}= req.params;
  // console.log(id)

 const sql = "DELETE FROM employee WHERE id=?";
 db.query(sql, [id] ,(err,result)=>{
  if(err){
    console.log(err)
    return res.status(501).json({status:false, msg:"database error." ,err:err})
  }
  return res.status(200).json({status:true, msg:"Employe Deleted successfully."})
 })
 
})



router.get("/get_employe/:id", (req, res) => {
  const { id } = req.params;
 
  console.log("from get, id:", id);
const sql = "SELECT * FROM employee WHERE id = ?";

db.query(sql, [id], (err,result)=>{
  if(err){
    console.log(err)
    return res.status(500).json({status:false, err:err})
  }
  res.status(200).json({status:true , result:result})
})



});
router.put("/update/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  console.log("from put", id);

  const values = [
    req.body.name,
    req.body.email,
    req.body.address,
    req.body.category_id,
    req.body.salary,
    req.file ? req.file.filename : null,
    id, // Make sure to include the id as the last parameter
  ];

  const sql = `
    UPDATE employee
    SET 
      name = ?,  
      email = ?,  
      address = ?, 
      category_id = ?, 
      salary = ?, 
      image = ?
    WHERE id = ?;
  `;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: false, err: err });
    }
    return res.status(200).json({ status: true, result: result });
  });
});

router.get("/admin_count" , (req,res)=>{
  const sql = "SELECT COUNT(id) as admin from admin"

  db.query(sql, (err,result)=>{
    if(err){
      console.log(err)
      return res.status(500).json({status:false , err:err})
    }
    res.status(200).json({status:true , result:result})
  })
})

router.get("/employee_count", (req, res) => {
  const sql = "SELECT COUNT(id) as employee from employee";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: false, err: err });
    }
    res.status(200).json({ status: true, result: result });
  });
});


router.get("/salary_count", (req, res) => {
  const sql = "SELECT Sum(salary) as salary from employee";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: false, err: err });
    }
    res.status(200).json({ status: true, result: result });
  });
});

router.get("/get_admins", (req,res)=>{
  const sql = "SELECT * FROM admin";

   db.query(sql, (err, result) => {
     if (err) {
       console.log(err);
       return res.status(500).json({ status: false, err: err });
     }
     res.status(200).json({ status: true, result: result });
   });

});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ status: true });
});
export  {router as adminRouter}