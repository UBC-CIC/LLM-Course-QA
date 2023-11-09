const userServices = require('../services/userService');


// Logs a registered user in, the body contains the user's email and password
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userServices.loginUser(email, password);
        if (!user) {
            res.status(400).json({success: false, error: 'Invalid email or password' });
        }
        res.status(200).json({success: true, user: user});
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}


// Registers a new user, the body contains the user's email, password, first name, and last name
exports.createUser = async (req, res) => {  
    const { email, password, firstName, lastName} = req.body;
    try {
        const user = await userServices.createUser(email, password, firstName, lastName);
        res.status(201).json({success: true, user: user});
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }   
}


// Retrieves a user's enrolled courses
exports.getCourses = async (req, res) => {
    const userId = req.params.userId;
    try {
        const courses = await userServices.getCourses(userId);
        res.status(200).json({success: true, courses: courses});
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}


// Updates a user's enrolled courses, the body of the request should be an array of course IDs
exports.updateCourses = async (req, res) => {
    
}



module.exports = {
    createUser,
    listUsers
}