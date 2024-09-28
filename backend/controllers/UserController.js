const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// gera o token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: '7d'
    })
}

// registra e loga o usuario

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({email: email});
    if (user) {
        res.status(422).json({
            errors: ["Por favor, utilize outro email"]
        })
        return;
    }

    // password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    });

    // se o usuario foi criado retorna o tokne

    if (!newUser) {
        res.status(422).json({ errors: ["Houve um erro, tente novamente mais tarde"] });
        return;
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

// login

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(!user) {
        res.status(404).json({errors: ["Usuario não encontrado"]});
        return;
    }

    // check password
    if(!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({errors: ["Senha invalida"]});
        return;
    }

    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    });

}

const getCurrentUser = async (req, res) => {
    const user = req.user;

    res.status(200).json(user);
}

const update = async (req, res) => {
    
    const {name, password, bio} = req.body;
    let profileImage = null

    if(req.file) {
        profileImage = req.file.filename
    }

    const reqUser = req.user;

    const user = await User.findById(reqUser._id).select("-password");
    
    if(name) {
        user.name = name;
    }
    if(password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash
    }
    if(profileImage) {
        user.profileImage = profileImage;
    }
    if(bio) {
        user.bio = bio;
    }

    await user.save();

    res.status(200).json(user);
}

const getUserById = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id).select("-password");
        if(!user) {
            res.status(404).json({errors: ["Usuario não encontrado"]});
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({errors: ["Usuario não encontrado"]});
        return;
    }

    
}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,

}