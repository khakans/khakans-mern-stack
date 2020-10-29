const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StoreSchema = new Schema({
    ownerID: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    storeBalance: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Store = mongoose.model("stores", StoreSchema);
