const {Router}  = require('express');
const Order = require('../model/Order');
const router = new Router();

router.post('/add',async (req,res) => {
    const {ordername} = req.body;
    const result = await Order.findOne({ordername: ordername});
    if(result){
       await Order.updateOne({ordername},{ordernum:result.ordernum +1})
       res.status(200).json({code: 0,message: "数量增加成功"})
       return;
    }
    await new Order(req.body).save();
    res.status(200).json({code: 0,message: "添加成功"})
})
router.get('/order_info',async (req,res) => {
    const result = await Order.find();
    res.status(200).json({code: 0,message: "获取成功",data:result})
})

router.post('/order_change',async (req,res) => {
    const {type,ordername} = req.body;
    const result = await Order.findOne({ordername: ordername});
    if(type === 'next'){
        await Order.updateOne({ordername},{ordernum:result.ordernum +1});
        res.status(200).json({code: 0,message: "数量增加成功"})
    }else{
        await Order.updateOne({ordername},{ordernum:result.ordernum -1})
        res.status(200).json({code: 0,message: "数量减少成功"})
    }
})

module.exports = router;