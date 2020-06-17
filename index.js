const Joi=require('joi')
const express = require('express');
const app = express();
// const mongoose=require('mongoose');

// mongoose.connect('mongodb://localhost:27017')
// const MongoClient=require('mongodb').MongoClient,format=require('util').format;

// MongoClient.connect('mongdb://127.0.0.1:27017',function(err,db){
//     if(err){
//         throw err;
//     }
//     else{
//         console.log('connected');
//     }
//     db.close();
// });

app.use(express.json());

const courses = [
    { id: 1, name:"user1"},
    { id: 2, name:"user2"},
    { id: 3, name:"user3"},
];
app.get('/',(req,res)=> {
    res.send('hello test');
});
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});
app.post('/api/courses',(req,res)=>{
    const {error} =validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length+1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id ===parseInt(req.params.id));
    if(!course) {
        res.status(404).send("id was not found")
        return;
    }
    
    const {error} =validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const schema = {
        name:Joi.string().min(3).required()
    }
    const result=Joi.validate(req.body, schema);
    if(!req.body.name || req.body.name.length<3){
        res.status(400).send("name 3 den asaqidi")
        return;
    }
    course.name=req.body.name;
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c=>c.id ===parseInt(req.params.id));
    if(!course) res.status(404).send("id was not found")
    res.send(course);
});

app.delete('/api/courses/:id',(req,res) =>{
    const course = courses.find(c=>c.id ===parseInt(req.params.id));
    if(!course) res.status(404).send("id was not found")

    const index=courses.indexOf(course);
    courses.splice(index,1);

    res.send(course)
})

const port = process.env.PORT || 3000;
// app.listen(port,()=> console.log(`listening on port ${port}..`));
app.listen(3000)
