import express from "express";
import mongoose from "mongoose";
import validator from "validator"
import cors from "cors"


const app = express();
app.use(express.json());
app.use(cors());

const studentSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  mobile_Number:{
    type:Number,
    required:true
  },
  Reg_no:{
    type:String,
    required:true
  }
})

const Student = mongoose.model("student", studentSchema);

app.post("/add", async (req, res)=>{
  try {
    const {name, email, mobile_Number, Reg_no} = req.body;
    const newStudent = new Student({
      name:name,
      email:email,
      mobile_Number:mobile_Number,
      Reg_no:Reg_no
    })

    const checkEmail = validator.isEmail(email);
    if(!checkEmail){
      return res.status(400).send({success:false, message:"Plz provide valied mailId"})
    }

    await newStudent.save();
    return res.status(200).send({success:true, message:'Added Successfully', data:newStudent})
  } catch (error) {
    return res.status(400).send({success:false, message:`Error:${error.message}`})
  }
})

app.get("/allStudent", async (req, res)=>{
  try {
    const studentsDetails = await Student.find({});
    return res.status(200).send({success:true, data:studentsDetails})
  } catch (error) {
    return res.status(500).send({success:false, message:`Error:${error.message}`})
  }
})

app.post("/removeStudent", async (req, res)=>{
  try {
    const {_id} = req.body;
    const checkForStudent = await Student.find({_id})
    if(!checkForStudent){
      return res.status(400).send({success:false, message:"It seems like deleted"})
    }

    await Student.findByIdAndDelete(_id);
    return res.status(200).send({success:true, message:'Removed'})

  } catch (error) {
    return res.status(500).send({success:false, message: `Error:${error.message}`})
  }
})

app.put("/updateStudentDetails", async (req, res)=>{
  try {
    const {_id, updatedData} = req.body;

    const update = {$set:{...updatedData}};
    const updatedStudentDetails =  await Student.findByIdAndUpdate(_id, update, {new:true, runValidators:true});
    
    return res.status(200).send({success:true, messaget:"Updated", data:updatedStudentDetails})

  } catch (error) {
    return res.status(400).send({success:false, message:`Error:${error.message}`})
  }
})

app.post("/findStudent", async (req, res)=>{
  try {
    const {_id} = req.body;
    const student = await Student.findById(_id);
    return res.status(200).send({success:true, data:student})
  } catch (error) {
    return res.status(400).send({success:false, message:`Error:${error.message}`})
  }
})

mongoose.connect("mongodb+srv://root:root@cluster0.c3aji.mongodb.net/Amazon_Clone");

app.listen(3000, ()=>{
  console.log("Server Started at localhost:3000")
})