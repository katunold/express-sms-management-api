import dbConnection from "../models";

export class Users {

    static retrieveUsers = (req, res) => {
        dbConnection.User.findAll({
            where: {}
        }).then(result => {
            let users = [];
            result.forEach(user => {
                delete user.dataValues.password;
                users.push(user);
            });
            return res.status(200).send({users});
        }).catch(error => {
            return res.status(500).send({error: error});
        })
    };

    static deleteUser = (req, res) => {};
}
