const User = require('../models/User');
const Course = require('../models/Course');


// Authenticates a user's credentials and returns their information
async function loginUser(email, password){
    User.findOne({where: {email: email, password: password}})
    .then(user => {
        return user;
    })
}


// Creates a new user and returns their information
async function createUser(email, password, firstName, lastName) {
    const user = User.build({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })
    await user.save();
    return user;
}


// Returns a user's enrolled courses
async function getCourses(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
        return null;
    }
    return user.courses;
}

module.exports = {loginUser, createUser, getCourses};