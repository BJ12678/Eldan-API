'use strict'
const User = use('App/Models/User');

class UserController {

    async login({request, auth}) {
        const {email, password} = request.all();          // grab data from request body
        const token = await auth.attempt(email, password);// authenticate user before login
        return token;                                     // return token to user or client
    }

    async register({request}) {
        const {email, password} = request.all();           // grab data from request body
        await User.create({
            email, 
            password,
            username: email
        });                                                // create new instance of user w/data
        return this.login(...arguments);                   // initiate login method after registered
    }
}

module.exports = UserController
