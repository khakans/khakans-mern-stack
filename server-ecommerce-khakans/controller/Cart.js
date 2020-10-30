const Cart = require('../models/Cart')

createCart = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a item',
        })
    }

    const cart = new Cart(body)

    if (!cart) {
        return res.status(400).json({ success: false, error: err })
    }

    cart
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: cart._id,
                message: 'cart created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'cart not created!',
            })
        })
}

updateCart = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Cart.findOne({ _id: req.params.id }, (err, cart) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Cart not found!',
            })
        }
        cart.buyerID = body.buyerID
        cart.sellerID = body.sellerID
        cart.itemID = body.itemID
        cart.total = body.total
        cart
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: cart._id,
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

deleteCart = async (req, res) => {
    await Cart.findOneAndDelete({ _id: req.params.id }, (err, cart) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!cart) {
            return res
                .status(404)
                .json({ success: false, error: `cart not found` })
        }

        return res.status(200).json({ success: true, data: cart })
    }).catch(err => console.log(err))
}

getCartById = async (req, res) => {
    await Cart.findOne({ _id: req.params.id }, (err, cart) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!cart) {
            return res
                .status(404)
                .json({ success: false, error: `cart not found` })
        }
        return res.status(200).json({ success: true, data: cart })
    }).catch(err => console.log(err))
}

getCart = async (req, res) => {
    await Cart.find({}, (err, cart) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!cart.length) {
            return res
                .status(404)
                .json({ success: false, error: `cart not found` })
        }
        return res.status(200).json({ success: true, data: cart })
    }).catch(err => console.log(err))
}

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCart,
    getCartById,
}
