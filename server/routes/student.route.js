const express = require('express');
const router = express.Router();
const Post = require(__dirname+'/../model/Answer');
const jwt = require('jsonwebtoken');


router.post('/answers', (req, res) =>{
    let student = jwt.decode(req.body.token)
    let studentID = student._id
    let data = {
        studentID: studentID,
        categories:{
            academicLife:req.body.academicLife,
            centerLife: req.body.centerLife
        }
    };
    let post = new Post(data);
    post.save()
    .then((data) =>{
        res.status(200).json({data:data,message: 'Successfully saved'});
    })
    .catch( err =>{
        res.status(400).json({err:err.message});
        
    });
    
});

router.get('/previuosAnswers/:studentID', (req, res) => {
    Post.find({studentID:req.params.studentID})
    .then(doc =>{
        console.log(doc)
        res.json(doc);
    })
    .catch(err =>{
        res.status(500).send(err);
    });
});



module.exports = router;