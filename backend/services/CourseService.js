const User = require('../models/User');
const Course = require('../models/Course');


async function createCourse(name, instructorId, description){
    const course =  Course.build({
        name: name,
        instructorId: instructorId,
        description: description
    })
    await course.save();
    return course.id;
}

async function listCourses(){

}


module.exports = {
    createCourse,
    listCourses
}