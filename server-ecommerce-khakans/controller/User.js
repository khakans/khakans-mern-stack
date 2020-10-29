const User = require('../models/User')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'user created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'user not created!',
            })
        })
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'user not found!',
            })
        }
        user.name = body.name
        user.email = body.email
        user.password = body.password
        user.balance = body.balance
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUser = async (req, res) => {
    await User.find({}, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!user.length) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getUserById,
}