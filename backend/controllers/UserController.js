const User = require('../models/User');

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
    const user = await User.findOne();
    if(user) {
        res.status(422).json({
            errors: ["Por favor, utilize outro email"]
        })
        return;
    }

    // password hash
    const salt = await bcrypt.genSalt();
    const passworHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: passworHash
    });

    // se o usuario foi criado retorna o tokne

    if(!newUser) {
        res.status(422).json({errors: ["Houve um erro, tente novamente mais tarde"]});
        return;
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}


module.exports = {
    register,
}