import express from "express";
import cors from "cors"
import jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
// import path from "path"
import { adminRouter } from "./admin.js";
import { employeeRoute } from "./employee.js"; 



const app= express();
const PORT = 1234;
app.use(cookieParser());

// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.json())
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));


app.use("/auth", adminRouter);
app.use("/employee", employeeRoute);



const verify = (req, res, next) => {
  const token = req.cookies.token;
console.log(token)
  if (!token) {
    return res.status(401).json({ status: false, err: "No token provided" });
  }

  jwt.verify(token,"process.env.SCREET_KEY", (err, decode) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ status: false, err: "Invalid token" });
    }

    req.role = decode.role;
    req.id = decode.id;
    next(); 
  });
};




app.get("/verify" ,verify, (req,res)=>{
  return res.status(200).json({ status: true, role: req.role, id: req.id });

})






app.listen(PORT, (err, res) => {
  if (err) {
    console.log("error during connection ", err);
  }
  console.log("Server connection is estabileshed At:", PORT);
});

