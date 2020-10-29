const Item = require('../models/Item')

createItem = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a item',
        })
    }

    const item = new Item(body)

    if (!item) {
        return res.status(400).json({ success: false, error: err })
    }

    item
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: item._id,
                message: 'Item created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Item not created!',
            })
        })
}

updateItem = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Item.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Item not found!',
            })
        }
        item.storeID = body.storeID
        item.name = body.name
        item.price = body.price
        item.stock = body.stock
        item
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: item._id,
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

deleteItem = async (req, res) => {
    await Item.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!item) {
            return res
                .status(404)
                .json({ success: false, error: `Item not found` })
        }

        return res.status(200).json({ success: true, data: item })
    }).catch(err => console.log(err))
}

getItemById = async (req, res) => {
    await Item.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!item) {
            return res
                .status(404)
                .json({ success: false, error: `Item not found` })
        }
        return res.status(200).json({ success: true, data: item })
    }).catch(err => console.log(err))
}

getItem = async (req, res) => {
    await Item.find({}, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!item.length) {
            return res
                .status(404)
                .json({ success: false, error: `Item not found` })
        }
        return res.status(200).json({ success: true, data: item })
    }).catch(err => console.log(err))
}

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getItemById,
}