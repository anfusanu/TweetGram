const db = require('./connection')
const { ObjectId } = require('mongodb')

module.exports = {

    googleLogin: (cred, callback) => {

        db.get().collection(process.env.COL_LOGIN).findOne({ email: cred.email })
            .then(result => {
                if (result) callback({ userExist: true, userName: cred.given_name, userId: result._id });
                else callback({ userExist: true });
            });

    },

    getMessages: (callback) => {
        db.get().collection(process.env.COL_MSG).find().toArray()
            .then((messages) => {
                callback(messages)
            })
            .catch(error => console.error(error))
    },
}