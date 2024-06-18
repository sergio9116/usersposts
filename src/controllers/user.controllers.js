const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

const getAll = catchError(async(req, res) => {
    const results = await User.findAll({include: [Post]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    //encriptando contraseña
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const result = await User.create({...req.body, password: hashedPassword});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id, {include: [Post]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;

    delete req.body.password
    delete req.body.email

    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError (async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({where: {email} })
        if(!user) return res.status(401).json({error: 'Invalid Credentials'})
        const isValid = bcrypt.compareSync(password, user.password)
        if(!isValid) return res.status(401).json({error: 'Invalid Credentials'})
        
        delete user.dataValues.password
       const token = jwt.sign(
            {user},
            process.env.TOKEN_SECRET,
            {expiresIn: '1d'}
       )

        return res.status(201).json({user, token})
})

const setPosts = catchError(async (req,res) => {
    const {id} = req.params
    //? localizamos el usuario con el id
    const user = await User.findByPk(id)
    if(!user) return res.sendStatus(404)
    //! seteamos post al usuario
    await user.setPosts(req.body)
    //? traemos los post asignados
    const post = await user.getPosts()
    //*retornamos la vista
    return res.json(post)
})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    setPosts
}