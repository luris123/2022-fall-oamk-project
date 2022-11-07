const User = require('../models/User');

const getUsers = async(req, res) => {
    const users = await User.find({});

    if (!users) return res.status(204).json({ 'message': 'No users found.' });
    
    console.log(users);
    res.json(users);
}

module.exports ={
    getUsers
};