import dbConnection from "../models";
import { Actions } from "../utils/actions";
import { validationResult } from "express-validator";
import {Op} from "sequelize";
import {generator} from "../utils/contact-generator";

export class SignUp {

    static op = Op;

    static signUp = async (req, res) => {

        const errors = validationResult(req);
        const contact = {
            contactNumber: await generator()
        };

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        dbConnection.User.findAll({
            where: {
                email: {
                    [SignUp.op.and]: [req.body.email]
                }
            }
        }).then(async result => {
            if (result.length) {
                return res.status(400).json({ errors: ['Email already in use.'] });
            }
            const userData = await Actions.addData( dbConnection.User, Object.assign({}, req.body, contact), [
                "email",
                "userName",
                "contactNumber",
                "password"
            ]);

            return res.status(201).send({ message: 'You are successfully registered with us ', contact: userData.contactNumber})

        })


    };

    static verifyAccount = (req, res) => {};

    static resendVerificationLink = (req, res) => {};

}
