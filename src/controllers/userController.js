const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

const signup = async(req,res) => {
    try {
        const {email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({email, password: hashedPassword});
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: 'User already exists!'});
    }
};

const login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error: 'Invalid credentials!'})
        }

        const token  = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
     } catch (error) {
        res.status(500).json({error: 'Internal Server Error!'});
    }
};

module.exports = {signup,login};