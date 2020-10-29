const Store = require('../models/Store')

createStore = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a item',
        })
    }

    const store = new Store(body)

    if (!store) {
        return res.status(400).json({ success: false, error: err })
    }

    store
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: store._id,
                message: 'store created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Item not created!',
            })
        })
}

updateStore = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Store.findOne({ _id: req.params.id }, (err, store) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'store not found!',
            })
        }
        store.ownerID = body.ownerID
        store.storeName = body.storeName
        store.storeBalance = body.storeBalance
        store
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: store._id,
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

deleteStore = async (req, res) => {
    await Store.findOneAndDelete({ _id: req.params.id }, (err, store) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!store) {
            return res
                .status(404)
                .json({ success: false, error: `Store not found` })
        }

        return res.status(200).json({ success: true, data: store })
    }).catch(err => console.log(err))
}

getStoreById = async (req, res) => {
    await Store.findOne({ _id: req.params.id }, (err, store) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!store) {
            return res
                .status(404)
                .json({ success: false, error: `store not found` })
        }
        return res.status(200).json({ success: true, data: store })
    }).catch(err => console.log(err))
}

getStore = async (req, res) => {
    await Store.find({}, (err, store) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!store.length) {
            return res
                .status(404)
                .json({ success: false, error: `store not found` })
        }
        return res.status(200).json({ success: true, data: store })
    }).catch(err => console.log(err))
}

module.exports = {
    createStore,
    updateStore,
    deleteStore,
    getStore,
    getStoreById,
}