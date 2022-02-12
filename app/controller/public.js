'use strict';
const Controller = require('egg').Controller;
const fs = require('mz/fs')
const Path = require('path')
const Moment = require('moment');
let delay = {
  Article: {
    time:'',
    cache: []
  },
  UserInfo:{
    time: '',
    cache: []
  },
  WeChat: {
    time: '',
    cache: [],
    openids: []
  },
  Message: {
    time: '',
    cache: []
  }
}
Moment.locale('zh-cn');
let id = 0,cache = {}, isStart = true;
// 保存照片
let saveFile = function(file, sessionID) {
    let path = Path.resolve(__dirname,'../public/imgs/' + file.filename);
    (cache[sessionID] || (cache[sessionID] = [])).push('http://127.0.0.1:3000/public/imgs/' + file.filename);
    fs.rename(file.filepath, path, err => {
        if(err) console.log(err);
    });
}

class publicController extends Controller {
  
  // 保存文章
  async publicArticle() {
    const { ctx } = this;
    let { response, request, service} = ctx;
    if(isStart){
      id = await service.find.getTotal();
      isStart = false;
    }
    let content = request.body;
    content.time = Moment().format("MMMDo hh:mm");
    content.id = id++;
    response.status = 200;
    // 延迟保存文章
    if(delay.Article.time){
      delay.Article.cache.push(content);
      ctx.body = '';
      return ;
    }
    delay.Article.cache.push(content);
    delay.Article.time = setInterval(()=>{
       // 将content保存到 数据库
      service.save.saveArticle(delay.Article.cache);
      // 清空
      delay.Article.cache = [];
      clearInterval(delay.Article.time);
      delay.Article.time = null;
    }, 2000);
    ctx.body = '';
  }
  // 保存照片
  async uploadImage() {
    const { ctx } = this;
    let { request,response } = ctx;
    let file = request.files[0];
    let { sessionID, last } = request.body;
    saveFile(file, sessionID);
    response.status = 200; 
    ctx.set('Content-type','application/json');
    if( !last ){
      response.status = 200;
        ctx.body = {}
        return;
    } 
    let imageBox = cache[sessionID]
    delete cache[sessionID];
    ctx.body = {
        imageBox
    }
  }
 
  // 提交留言
  async publicMessage() {
    let { ctx } = this;
    let { request, response, service } = ctx;
    let content = request.body;
    response.status = 200;
    ctx.body = ''
    content.time = Moment().format("MMMDo hh:mm");

    if(delay.Message.time){
      delay.Message.cache.push(content);
      ctx.body = '';
      return ;
    }
    delay.Message.cache.push(content);
    delay.Message.time = setInterval(()=>{
       // 将content保存到 数据库
       service.save.saveMessage(delay.Message.cache);
      // 清空
      delay.Message.cache = [];
      clearInterval(delay.Message.time);
      delay.Message.time = null;
    }, 2000);
    ctx.body = '';
  }

  // 保存信息
  async saveUserInfo() {
    let { ctx } = this,{ request, response, service } = ctx;
    let content = request.body;
    response.status = 200;
    if(delay.UserInfo.time){
      delay.UserInfo.cache.push(content);
      ctx.body = '';
      return ;
    }
    delay.UserInfo.cache.push(content);
    delay.UserInfo.time = setInterval(()=>{
       // 将content保存到 数据库
       service.save.saveUserInfo(delay.UserInfo.cache);
      // 清空
      delay.UserInfo.cache = [];
      clearInterval(delay.UserInfo.time);
      delay.UserInfo.time = null;
    }, 2000);
    ctx.body = '';
  }

  // 保存微信
  async saveWeChat(){
    let { ctx } = this,{ request, response, service, query } = ctx;
    let content = request.body,{openid} = query;
    if(delay.WeChat.time){
      delay.WeChat.cache.push(content);
      delay.WeChat.openids.push(openid);
      ctx.body = '';
      return ;
    }
    delay.WeChat.cache.push(content);
    delay.WeChat.openids.push(openid);
    delay.WeChat.time = setInterval(()=>{
       // 将content保存到 数据库
       service.save.saveWeChat(delay.WeChat.cache);
       service.updata.reduceTime(delay.WeChat.openids);

      // 清空
      delay.WeChat.cache = [];
      delay.WeChat.openids = [];
      clearInterval(delay.WeChat.time);
      delay.WeChat.time = null;
    }, 2000);
    ctx.body = '';
  } 
}
module.exports = publicController;
