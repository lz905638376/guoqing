const {model} = require('mongoose');
const mongoose = require('mongoose')

module.exports = model('order',{
    appuserid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'appuser'
    },
    // id
    id: {
        type: String,
        required: true
    },
    //名称
    ordername: {
        type: String,
        required: true
    },
    //价格
    orderprice: {
        type: Number,
        required: true
    },
    //订单数量
    ordernum: {
        type: Number,
        required: true
    }
})