'use strict';
let delay = {
    getArticle:{
        time: '',
        cache:''
    },
    WeChat: {
        time: '',
        openids: [],
    },
    gender: {
        time: '',
        cache: ''
    }
}
const Controller = require('egg').Controller;
class GetController extends Controller {
    // 获取去动态文章
    async getArticle () {
        let { ctx } = this;
        let { request,response, service } = ctx;
        response.status = 200;
        ctx.set('Content-type','application/json');
        if(delay.getArticle.time){
            ctx.body = delay.getArticle.cache;
            return;
        }
        let data = await service.find.getArticle();
        delay.getArticle.cache = data;
        delay.getArticle.time = setInterval(()=>{
            clearInterval(delay.getArticle.time);
            delay.getArticle.time = null;
        }, 1500)
        
        ctx.body = data;
    }
    // 获取懒加载
    async getLoadArticle () {
        let { ctx } = this;
        let { request, response, service } = ctx;
        let { type, skip } = request.body;
        let data = await service.find.getLoadArticle(type, skip);
        response.status = 200;
        ctx.set('Content-type','application/json');
        ctx.body = data
    }

    // 获取留言
    async getMessage () {
        let { ctx } = this;
        let { request, response, service, query } = ctx;
        let name = query.name;
        let data = await service.find.getMessage(name);
        response.status = 200;
        ctx.set('Content-type','application/json');
        ctx.body = data;
    }
    // 判断是否封号
    async isfenghao() {
        let { ctx } = this;
        let { response, service, query } = ctx;
        response.status = 200;
        ctx.set('Content-type','application/json');
        let {openid} = query
        let res = await service.find.isfenghao(openid);
        ctx.body = res
        
    }

    // 获取性别
    async getGender () {
        let { ctx } = this, { response, service, query } = ctx;
        let { openid } = query;
        let gender =await service.find.gender(openid);
        response.status = 200;
        ctx.set('Content-type','application/json');
        ctx.body = gender;
    }

    // 获取次数
    async getTime() {
        let { ctx } = this, {response, service, query } = ctx;
        let { openid } = query;
        let time = await service.find.getTime(openid);
        response.status = 200;
        ctx.set('Content-type','application/json');
        ctx.body = time;
    }
    // 获取微信
    async getWechat() {
        let { ctx } = this, {response, service, query } = ctx;
        let { openid , gender } = query;
        let wechat = await service.find.getWechat(gender);
        response.status = 200;
        ctx.set('Content-type','application/json');
        ctx.body = wechat;
        if(!wechat){
            return;
        }
        if(delay.WeChat.time){
            delay.WeChat.openids.push(openid);
            return ;
        }
          delay.WeChat.openids.push(openid);
          delay.WeChat.time = setInterval(()=>{
          service.updata.reduceTime(delay.WeChat.openids);
          // 清空
          delay.WeChat.openids = [];
          clearInterval(delay.WeChat.time);
          delay.WeChat.time = null;
          }, 2000);
    }

    // 获取人数
    async getNum(){
        let { ctx } = this, {response, service } = ctx;
        
        response.status = 200;
        ctx.set('Content-type','application/json');
        if(delay.gender.time){
            ctx.body = delay.gender.cache;
            return ;
        }

        let data =await service.find.getNum();
        ctx.body = data;
        delay.gender.cache = data;
        delay.gender.time = setInterval(()=>{
            clearInterval(delay.gender.time);
            delay.gender.time = null;
        }, 2000)
    }
}

module.exports = GetController;
