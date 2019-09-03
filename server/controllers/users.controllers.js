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

    static deleteUser =  (req, res) => {
        const { contactId } = req.params;
        dbConnection.User.destroy({
            where: {
                contactNumber: contactId
            }
        }).then( result => {
            return !!result
              ? res.status(204).send({msg: `User with contactId ${contactId} has been deleted successfully`})
              : res.status(200).send({msg: `User with contactId ${contactId} does not exist`});
        });

    };
}
