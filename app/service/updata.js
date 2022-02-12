const Service = require('egg').Service;

class UpdataService extends Service {
    // 得优化
  async UpdataComment(args) {
    let { model } = this.ctx;
    let ids = [];
    let cache = {}
    args.forEach(({_id, info}) => {
      ids.push(_id);
      (cache[_id] || (cache[_id] = [])).push(info);
    });
   
    let data = await model.Article.find({_id:{$in:ids}},{comment:1});

    for (let i = 0,l = data.length; i< l ; i++){
      data[i].comment.push(...cache[data[i]._id])
      await model.Article.updateOne({ _id:data[i]._id }, { comment: data[i].comment}); 
    }
  }
  // // 保存性别
  // async updateGender(args) {
  //   let { model } = this.ctx;
  //   for(let i = 0,l = args.length; i < l ; i ++){
  //     await model.User.updateOne({ openid:args[i].openid, }, { gender:args[i].gender}); 
  //   }
  // }

  // 次数减一
  async reduceTime( openids ){
    let { model } = this.ctx;
    let data = await model.User.find({openid: {$in: openids}},{time:1})
    for(let i = 0,l = data.length; i< l; i ++) {
      await model.User.updateOne({_id: data[i]._id}, { time: data[i].time-1})
    }
  }
}
module.exports = UpdataService;