'use strict';
const Controller = require('egg').Controller;

let delay = {
  Comment: {
    time: '',
    cache: []
  },
  Gender:{
    time: '',
    cache: []
  }
}

class UpdataController extends Controller {
  // 更新评论
  async updataComment() {
    const { ctx } = this;
    let { request, response, service } = ctx;
    let { info, _id } = request.body
    response.status = 200;
       // 延迟保存评论
       if(delay.Comment.time){
        delay.Comment.cache.push({_id, info});
        ctx.body = '';
        return ;
      }
      delay.Comment.cache.push({_id, info});
      delay.Comment.time = setInterval(()=>{
         // 将content保存到 数据库
        service.updata.UpdataComment(delay.Comment.cache);
        // 清空
        delay.Comment.cache = [];
        clearInterval(delay.Comment.time); 
        delay.Comment.time = null;
      }, 2000);
      ctx.body = '';
  }

    // 提交点赞数量 
  async updateLike(){
    const { ctx } = this, { request, response, service } = ctx;
    let { openid } = request.body;
    
    ctx.body = ''
  }
}

module.exports = UpdataController;
