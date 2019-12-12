const Post = require('../model/Answer');
const Student = require('../model/Student');

function analytics(category, number,date, rangeDate) {
    return new Promise((resolve, reject) => {
        Post.aggregate([
            {
                $match:{
                    timestamp:{ $gte:rangeDate, $lte: new Date(date)}
                }
            }, 
            {
                $group: {
                    _id: `$categories.${category}.Q${number}`,
                    answers: { $sum: 1 },
                    timestamp:{  $first: '$timestamp' }
                }
            },
            {
                $project: {
                    _id: 1,
                    description: { $ifNull: ["Q" + number, "Unspecified"] },
                    answers: 1,
                    timestamp:1
                   
                }
            },
        ])
            .then((data) => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}


function getLength(date){
    return new Promise((resolve, reject) =>{
        let rangeDate = new Date(date - 12096e5);
        Post.countDocuments({timestamp:{$gt:rangeDate, $lt:date}}).then(data => {
            resolve(data);
           })
           .catch(err =>{
             reject(err);
           });
    });
}

function getStudentsInfo(data, projection){
    return new Promise((resolve, reject) =>{
        console.log(data)
        let select = 'firstname lastname gender batch id';
        let endDate = new Date().setDate(data.date.getDate()+14);
        let test = [];
        let filter = {timestamp:{$lte:new Date(data.date), $lte:new Date(endDate)}};
        filter[`categories.${category}.${data.questionNumber}`] = data.value;
        
        Post.find(filter, projection)
        .populate('studentID', select)
        .sort({timestamp: 1})
        .then( data =>{
            if(data){
                data.forEach(element => { 
                    test.push(element.studentID._id) 
                }); 
                getGenderCount(test)
                .then(doc =>{
                   
                    resolve({data:data,genderCount:doc})
                })
                .catch(err =>{
                    reject(err)
                })
            }else{
                resolve('not users');
            }
        })
        .catch(err =>{
            reject(err);
        });
    });
}

function getGenderCount(studentID){
    return new Promise((resolve, reject) => {
        Student.aggregate([
            {
                $match:{
                   _id:{$in:studentID}
                }
            },
            {
              $group: {
                    _id:'$gender',
                    count: { $sum: 1 },
                   
                }
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                    timestamp:1
                   
                }
            },
        ])
        
            .then((data) => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}



function getStudentsByDate(date, number,rangeDate){
     date = date.setDate(date.getDate()+1)
    //console.log(endDate)
    return new Promise((resolve, reject) =>{
            if (number < 7) {
                analytics('centerLife', number, date,rangeDate)
                    .then(data => {
                        resolve(data)
                        // res.json({ data: data})
                    })
                    .catch(err => {
                        reject(err)
                    })
    
            } else {
                analytics('academicLife', number, date, rangeDate)
                    .then(data => {
                        resolve(data)
                        // res.json({ data: data})
                    })
                    .catch(err => {
                        reject(err)
                    })
            }
    })
}

// function getStudentsInfo(id){
//     return new Promise((resolve, reject) =>{

//     })
// }


module.exports = {
    analytics,
    getLength,
    getStudentsInfo,
    getGenderCount,
    getStudentsByDate

};