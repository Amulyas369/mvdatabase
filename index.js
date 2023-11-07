const express =require("express");
const cors =require("cors");
const mongoose=require("mongoose");

// Start

// const multer = require('multer');
// const path = require('path');

//END


const app=express();
app.use(cors(
    {
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
))
app.use(express.json())
const port=process.env.PORT || 8083


//START


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Save uploaded files to the 'uploads/' folder
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
//   });
  
//   const upload = multer({ storage: storage });

  //END


//for schema creating

const schemadb=mongoose.Schema({
    moviesID:Number,
    language:String,
    title:String,
    poster:String,
    url:String

},
{
    timestamps:true
}
)

const usermodel=mongoose.model("movies",schemadb)



//for read
//​http://localhost:8080/

app.get("/",async(req,res)=>{
    const data= await usermodel.find({})
    res.json({
        success:true,data:data
    })
})




//duplicate create

// app.post('/create', upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'url', maxCount: 1 }]), async (req, res) => {
//     const { moviesID, language, title } = req.body;
//     const poster = req.files['poster'][0].filename;
//     const url = req.files['url'][0].filename;
  
//     const data = new usermodel({
//       moviesID: moviesID,
//       language: language,
//       title: title,
//       poster: poster,
//       url: url,
//     });
  
//     await data.save();
//     res.send({ success: true, message: 'Data saved', data: data });
//   });



  //end









//for create data
//​http://localhost:8080/create


app.post("/create", async(req,res)=>{
    console.log(req.body);
    const data= new usermodel(req.body);
    await data.save();
    res.send({success:true,massage:"data saved",data:data})
})


// for update data
//​http://localhost:8080/update

app.put("/update",async(req,res)=>{
console.log(req.body);
const {_id,...rest}=req.body;
const data=await usermodel.updateOne({_id: _id},rest);
res.send({success:true,massage:"data update successfully",data:data})
})




//  for data Dealete
//​http://localhost:8080/delete/id
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const data= await usermodel.deleteOne({_id:id});
    res.send({success:true,massage:"data deleted successfully",data:data})
})



mongoose.connect("mongodb://127.0.0.1:27017/moviesdata").then(
    ()=>{
        console.log("Connect with db")
        app.listen(port,()=>{
            console.log("server is running")
        })
    }
).catch((err)=>{
 console.log(err)
})


