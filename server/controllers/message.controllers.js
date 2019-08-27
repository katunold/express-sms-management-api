import dbConnection from "../models";
import {Actions} from "../utils/actions";
import {validationResult} from "express-validator";

export class MessageController {

    static sendMessage = (req, res) => {

        const errors = validationResult(req);
        const { receiverId } = req.body;

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const sender = {
            senderId: req.auth.sub
        };

        dbConnection.User.findAll({
            where: {
                contactNumber: receiverId
            }
        }).then( async result => {
            if (result.length) {
                const userData = await Actions.addData( dbConnection.Message, Object.assign({}, req.body, sender), [
                    "receiverId",
                    "textMessage"
                ]);

                return res.status(201).send({ message: `sms has been sent to ${userData.dataValues.receiverId}` });

            }
            return res.status(400).json({ errors: [`User with ${receiverId} does not exit`] });
        });
    };

    static retrieveMessages = (req, res) => {
        dbConnection.Message.findAll({
            where: {
                receiverId: req.auth.sub
            }
        }).then( result => {
            if (result.length) {
                return res.status(200).send({ messages: result });
            }
            return res.status(200).send({ message: 'Sorry, your inbox is currently empty' })
        }).catch( e => console.log(e));
    };

    static retrieveSingleMessage = (req, res) => {};
}
