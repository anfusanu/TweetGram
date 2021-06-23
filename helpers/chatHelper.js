const db = require('./connection')
const { ObjectId } = require('mongodb')

module.exports = {

    googleLogin: (cred, callback) => {

        db.get().collection(process.env.COL_LOGIN).findOne({ email: cred.email })
            .then(result => {
                if (result) {
                    if (result.img != result.img || !result.img) {
                        db.get().collection(process.env.COL_LOGIN).updateOne({ _id: result._id }, { $set: { img: cred.picture } })
                            .then(after => {
                                callback({ userExist: true, userName: cred.given_name, userId: result._id, img: cred.picture });
                            })
                    } else {
                        callback({ userExist: true, userName: cred.given_name, userId: result._id, img: result.img });
                    }
                }
                else {
                    callback({ userExist: false });
                }

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