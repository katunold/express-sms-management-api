import { validationResult } from "express-validator";
import dbConnection from "../models";
import {signToken} from "../utils/jwt";

export class Login {

    static login = (req, res) => {
        const { contactNumber, password } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        dbConnection.User.findOne({
            where: {
                contactNumber: contactNumber,
                password: password
            }
        }).then( result => {
            if (!result) {
                return res.status(404).send({ errors: "User doesn't exist" })
            }
            return res.status(200)
              .send(
                {
                    success: "Successfully logged in",
                    accessToken: signToken(result.dataValues.contactNumber, result.dataValues.isAdmin )})
        }).catch( error => console.log(error));
    };

}
