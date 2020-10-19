const {model} = require('mongoose');

module.exports = model('goods', {
    //id
    id: {
        type: Number,
        required: true
    },
    //商品名
    goodsname: {
        type: String,
        required: true
    },
    goodstype: {
        type: String,
        required: true
    },
    //商品价格
    goodsprice: {
        type: Number,
        required: true
    },
    //商品销量
    goodsnum: {
        type: Number,
        required: true
    }
    
});