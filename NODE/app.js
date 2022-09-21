const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');

const StudentController = require('./Controllers/StudentControllor');
const UserController = require('./Controllers/UserControllor');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.set('view engine','ejs');

mongoose.connect('mongodb://localhost:27017/studentdb', (err)=> {
    if(err){
        console.log(err);
    }else{
        console.log('Database connected');
    }
});

app.get('/',UserController.login_page);
app.post('/login',UserController.user_login);
app.get('/logout',UserController.user_logout);
app.get('/register',UserController.register_page);
app.post('/register',UserController.user_register);

app.use((req,res,next) => {
    let token = req.cookies.authtoken;
    if(token){
        jwt.verify(token, 'abc123', (err,decoded)=>{
            if(err){
                res.json(err);
            }else{
                next();
            }
        });
    }
});

app.get('/students',StudentController.get_all_students);
app.get('/addstudent',StudentController.add_student_page);
app.post('/students',StudentController.add_student);
app.get('/updatestudent/:id',StudentController.update_student_page);
app.put('/students/:id',StudentController.update_student);
app.get('/deletestudent/:id',StudentController.delete_student_page);
app.delete('/students/:id',StudentController.delete_student);


app.listen(3000,()=>{
    console.log('Server started at port 3000');
});