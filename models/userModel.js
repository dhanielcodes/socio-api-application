const userCollection = require("../db").collection('users')
const validator = require("validator")

const UserModel = function (user) {
    this.user = user
    this.errors = []
}

//register


UserModel.prototype.cleanUpRegister = function () {
    if (typeof (this.user.username) != "string") { this.user.username = "" }
    if (typeof (this.user.email) != "string") { this.user.email = "" }
    if (typeof (this.user.password) != "string") { this.user.password = "" }

    // get rid of any bogus properties
    this.user = {
        username: this.user.username.trim().toLowerCase(),
        email: this.user.email.trim().toLowerCase(),
        password: this.user.password
    }
}

UserModel.prototype.validateRegister = function () {
    if (this.user.username == "") { this.errors.push("You must provide a username.") }
    if (this.user.username != "" && !validator.isAlphanumeric(this.user.username)) { this.errors.push("Username can only contain letters and numbers.") }
    if (!validator.isEmail(this.user.email)) { this.errors.push("You must provide a valid email address.") }
    if (this.user.password == "") { this.errors.push("You must provide a password.") }
    if (this.user.password.length > 0 && this.user.password.length < 12) { this.errors.push("Password must be at least 12 characters.") }
    if (this.user.password.length > 100) { this.errors.push("Password cannot exceed 100 characters.") }
    if (this.user.username.length > 0 && this.user.username.length < 3) { this.errors.push("Username must be at least 3 characters.") }
    if (this.user.username.length > 30) { this.errors.push("Username cannot exceed 30 characters.") }
}


UserModel.prototype.storeUser = function () {

    this.validateRegister()
    this.cleanUpRegister()


    if (!this.errors.length) {
        console.log(this.user)
        userCollection.insertOne(this.user)
    }

}

//login

UserModel.prototype.cleanUpLogin = function () {
    if (typeof (this.user.username) != "string") { this.user.username = "" }
    if (typeof (this.user.password) != "string") { this.user.password = "" }

    // get rid of any bogus properties
    this.user = {
        username: this.user.username.trim().toLowerCase(),
        password: this.user.password
    }
}

UserModel.prototype.validateLogin = function () {
    return new Promise(async (resolve, reject) => {
        this.cleanUpLogin()
        const userFound = await userCollection.findOne({ username: this.user.username, password: this.user.password })
        if (!userFound) {
            this.errors.push(`Invalid Details`)
            reject(this.errors)
        } else {
            this.user = userFound
            resolve(userFound)
        }
    })
}

UserModel.prototype.findUser = function () {
    return this.validateLogin()
}


module.exports = UserModel