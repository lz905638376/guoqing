const {Router} = require('express');
const Goods = require('../model/Goods');
const router = new Router();
const {mock} = require('mockjs')


// 造数据
// const result = mock({
//     'list|40':[
//         {
//             'id|+1':100,
//             'goodsname':'@ctitle',
//             'goodstype|1':['家居生活','生活电器','休闲娱乐'],
//             'goodsprice|1000-3000':0,
//             'goodsnum|200-500':0
//         }
//     ]
// }).list
// console.log(result);
// const arr = result.map(item => {
//     return new Goods(item).save();
// })
// Promise.all(arr).then(res => {
//     console.log(res);
//     console.log('保存成功');
// })
// .catch(error => {
//     console.log(error);
//     console.log('保存失败');
// })


//添加商品
router.post('/add',async (req,res) => {
    const {goodsname} = req.body;
    const result = await Goods.findOne({goodsname});
    if(result){
        res.status(200).json({code: -1,message: "该商品已经存在"});
        return;
    }

    await new Goods(req.body).save();
    res.status(200).json({code: 0,message: "添加成功"})
})


// 获取商品信息
router.post('/goods_info', async (req, res)=>{
    const {index} = req.body;
    // 查询用户数据
    console.log(index);
    const result = await Goods.find();
    //
    const result2 = await Goods.find().skip(index*4).limit(4);
    // 响应
    res.status(200).json({code: 0, message: 'ok', data: result,dataOne:result2});
  })
  //获得分类商品信息
router.post('/goods_category',async (req,res) => {
    const {goodsname} = req.body;
    console.log(goodsname);
    const result = await Goods.find({goodstype:goodsname});

    res.status(200).json({code: 0, message: 'okkkkkk', data: result});
})
//获得商品详情的信息
router.post('/goods_detail',async (req,res) => {
    const {id} = req.body;
    const result = await Goods.findById(id);

    res.status(200).json({code: 0,message :'详情成功',data : result});
})

//删除商品信息
router.post('/goods_del',async (req,res) => {
    const {id} = req.body;
    console.log(id);
    await Goods.findByIdAndDelete(id)

    res.status(200).json({code: 0,message: '删除成功'})
})



  module.exports = router;