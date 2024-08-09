const UserModel = require("../models/userModel")

exports.home = (req, res) => {
    res.render('home-guest')
}

exports.register = (req, res) => {
    const user = new UserModel(req.body)
    user.storeUser()
    if (user.errors.length) {
        res.status(400).send(user.errors)
    } else {
        res.status(200).send(user.user)
    }
}

exports.login = (req, res) => {
    const user = new UserModel(req.body)
    user.findUser(() => {
        if (user.errors.length) {
            res.status(400).send(user.errors)
        } else {
            res.status(200).send(user.user)
        }
    })


}