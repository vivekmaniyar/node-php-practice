const Student = require('../Models/Student');

module.exports.get_all_students = (req,res) => {
    Student.find((err,students) => {
        if(err){
            res.json(err);
        } else {
            if(!students){
                res.json({message: 'No students found'});
            } else {
                res.render('student', {students: students});
            }
        }
    })
};

module.exports.add_student = (req,res) => {
    let student = new Student({
        name: req.body.name,
        email: req.body.email,
        class: req.body.class,
        semester: req.body.semester
    });

    student.save((err,doc) => {
        if(err){
            res.json(err);
        } else {
            res.json({message: 'Student added successfully'});
        }
    });
};

module.exports.add_student_page = (req,res) => {
    res.render('addstudent');
};

module.exports.update_student_page = (req,res) => {
    Student.findOne({_id: req.params.id},(err, student) => {
        if(err){
            res.json(err);
        }else{
            if(!student){
                res.json({message: 'Student not found'});
            }else{
                res.render('updatestudent', {student: student});
            }
        }
    });
};

module.exports.update_student = (req,res) => {
    Student.findOne({_id: req.params.id},(err, student) => {
        if(err){
            res.json(err);
        }else {
            if(!student){
                res.json({message: 'Student not found'});
            }else{
                student.name = req.body.name;
                student.email = req.body.email;
                student.class = req.body.class;
                student.semester = req.body.semester;

                student.save((err,doc) => {
                    if(err){
                        res.json(err);
                    }else{
                        res.json({message: 'Student updated successfully'});
                    }
                })
            }
        }
    });
}

module.exports.delete_student_page = (req,res) => {
    Student.findOne({_id: req.params.id},(err,student) => {
        if(err){
            res.json(err);
        }else{
            if(!student){
                res.jsone({message: 'Student not found'});
            }else{
                res.render('deletestudent', {student: student});
            }
        }
    });
};

module.exports.delete_student = (req,res) => {
    Student.findOne({_id: req.params.id},(err,student)=> {
        if(err){
            res.json(err);
        }else{
            if(!student){
                res.json({message: 'Student not found'});
            }else{
                student.remove((err,doc) => {
                    if(err){
                        res.json(err);
                    }else{
                        res.json({message: 'Student deleted successfully'});
                    }
                })
            }
        }
    });
};