import dbConnection from "../models";
import { Op } from "sequelize";


const op = Op;
export const generator = async () => {
    let exists;
    let phoneNumber;
    phoneNumber = `073${Math.random() * (10 ** 7) << 0}`;
    phoneNumber += '0'.repeat(10 - phoneNumber.length);
    exists = await checkNumberExists(phoneNumber);
    while (exists.length) {
        phoneNumber = `073${Math.random() * (10 ** 7) << 0}`;
        phoneNumber += '0'.repeat(10 - phoneNumber.length);
        exists = await checkNumberExists(phoneNumber);
    }
    return phoneNumber;
};

const checkNumberExists = (contact) => {
    return dbConnection.User.findAll({
        where: {
            contactNumber: {
                [op.and]: [contact]
            }
        }
    })
};
