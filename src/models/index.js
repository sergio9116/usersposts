const User = require("./User");
const Post = require("./Post")


//RELACIONES DE MUCHOS A MUCHOS (m-m)
User.belongsToMany(Post, {through: 'favorites'})
Post.belongsToMany(User, {through: 'favorites'})

//RELACIONES DE UNO A MUCHOS (n-m)
Post.belongsTo(User) //userId
User.hasMany(Post)

