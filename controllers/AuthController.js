const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const apiResponse = require('../helpers/apiResponse');

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
        async (req, res) => {
            try {
                let newUser = req.body;
                newUser.password = await bcrypt.hash(newUser.password, 10);
                await new UserModel(newUser).save();
                return apiResponse.successResponse(res, "User Registered Successfully")
            } catch (err) {
                return apiResponse.errorResponse(res, err.message);
            }
        }
    ];

    /**
 * Method to Login User
 * @param {String} email
 * @param {String} password
 */
    loginUser = [
        async (req, res) => {
            try {
                let user = await UserModel.findOne({ email: req.body.email });
                //If user exist proceed further otherwise return error response
                if (!user)
                    return apiResponse.errorResponse(res, "Invalid Credentials");
                else {
                    let isPasswordMatches = await bcrypt.compare(req.body.password, user.password);

                    //If password matches proceed further otherwise return error response
                    if (!isPasswordMatches)
                        return apiResponse.errorResponse(res, "Invalid Credentials");
                    else {
                        req.session.userName = user.firstName + " " + user.lastName;
                        req.session.email = user.email;
                        req.session.userId = user._id;
                        return apiResponse.successResponse(res, "User Logged In Successfully...");
                    }

                }
            } catch (err) {
                console.log(err);
                return apiResponse.errorResponse(res, err.message);
            }
        }
    ];

    //Method to logout user
    logout = [
        async (req, res) => {
            req.session.destroy();
            return res.redirect('/auth/login');
        }
    ]
}




module.exports = new AuthController();