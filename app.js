const express=require('express');
const fileUpload=require("express-fileupload");


const app=express();
app.use(express.json());
app.use(fileUpload());
const PORT=process.env.PORT || 4000;
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

let courses=[
        {       
                course_id:101,
                course:'Angular',
                fee:299
        },
        {       
                course_id:102,
                course:'react js',
                fee:399
        },
        {       
                course_id:103,
                course:'spring boot',
                fee:1299
        },
        {       
                course_id:104,
                course:'PostgreSQL',
                fee:999
        }
]
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/api/v1/welcome",(req,res)=>{
        res.status(200).json("Welcome to the Swagger DOC APP");
})
app.get("/api/v1/course",(req,res)=>{
        res.send({"courseId":"101","course":"Boot camp full stack","price":'$400'});
})
app.get("/api/v1/courses",(req,res)=>{
        res.status(200).send(courses)
})
app.get("/api/v1/course/:courseId",(req,res)=>{
        const myCourse=courses.find(course=>course.course_id == req.params.courseId);
        res.send(myCourse);
})
app.post("/api/v1/addCourse",(req,res)=>{
        console.log("adding course>>>",req.body);
        courses.push(req.body);
        res.send({message:"Course added successfully"});
})
app.get("/api/v1/coursequery",(req,res)=>{
        let location= req.query.location;
        let device= req.query.device;
        res.send({location,device});
})
app.post("/api/v1/courseupload",(req,res)=>{
        console.log("header >>>",req.headers);
        const file = req.files.file;
        let path = __dirname + "/images/" + Date.now() + ".jpg";
        file.mv(path,(err)=>{
                if(!err){
                 res.send(true);
                }
                else{
                 res.send(false);
                }
        })
})

app.listen(PORT,()=>{console.log(`Server is running at ${PORT} ...`)})