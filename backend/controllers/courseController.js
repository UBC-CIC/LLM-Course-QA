const {createCourse, listCourses} = require('../services/CourseService');

const createCourse = async (req, res) => {
    try {
        const course = await createCourse(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(500);
    }
};

const listCourses = async (req, res) => {
    try {
        const courses = await listCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500);
    }
}

module.exports = {
    createCourse,
    listCourses
}
