    const UserModel = require('../models/UserModel');
    const bcrypt = require('bcrypt'); 

    class AuthController {
        /**
         * Method To Render Log In Page
         */
        renderLogInPage = async (req, res) => {
            return res.render('auth/login');
        }

        /**
         * Method To Render Register Page
         */
        renderRegisterPage = async (req, res) => {
            return res.render('auth/register');
        }

        /**
         * Method To Register User
         * @param {String} firstName 
         * @param {String} lastName
         * @param {String} email
         * @param {String} mobile
         * @param {String} password
         * @returns {Object}
         */
        registerUser = [
            async(req, res)=>{
                try {
                    let newUser = req.body;
                    newUser.password = await bcrypt.hash(newUser.password, 10);
                    await new UserModel(newUser).save();
                    return res.send(201).status("User Created Successfully");
                } catch (err) {
                    console.log(err);
                    return res.status(500).send(err.message);
                }
            }
        ]
    }

    module.exports = new AuthController();