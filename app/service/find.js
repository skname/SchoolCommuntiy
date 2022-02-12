'use strict';
const Service = require('egg').Service;

let findByType = async function(that, type, skip = 0) { // skip 跳过，limit 取几个
	if(type === 'all') {
		return await that.ctx.model.Article.find({id:{$gt:0}}).skip(skip).limit(5);
	}
	return await that.ctx.model.Article.find({type, id:{$lt:200}}).skip(skip).limit(5);
}

let getRandom = function(num) {
	return Math.round(Math.random()*(num-1));
}
class Get extends Service {
	async getTotal () {
		let data;
		try {
			data = await this.ctx.model.Article.find().count();
		}catch(err){
			console.log(err)
		}finally{
			return data;
		}
	}
// 获取文章
	async getArticle() {
        let data = {};
		try {
            data.all = await this.ctx.model.Article.find({id:{$gt:0}}).limit(5);
			data.day = await findByType(this, 'day');
			data.confession = await findByType(this, 'confession');
			data.disclose = await findByType(this, 'disclose');
			data.used = await findByType(this, 'used');
			data.lose = await findByType(this, 'lose');
			data.invite = await findByType(this, 'invite');
			data.handpick = await findByType(this, 'handpick');
		} catch (err) {
			console.log(err)
		}finally{
            return data  
        }
	}

	// 懒加载
	async getLoadArticle (type, skip ) {
		try{
			return await findByType(this, type, skip);
		}catch(err){
			
		}
	}
 
	// 获取留言
	async getMessage( name ) {
		try{
			return await this.ctx.model.Message.find({name});
		}catch(err){

		}
	}
	// 是否封号
	async isfenghao( openid ) {
		try{
			let {isStop} = await this.ctx.model.User.findOne({openid});
			return isStop;
		}catch(err){
		}
		
	}
	// 获取性别
	async gender(openid) {
		try{
			let {gender}  = await this.ctx.model.User.findOne({openid});
			return gender;
		}catch(err) {
		}
	}

	// 获取捞取次数
	async getTime(openid) {
		try{
			let {time} = await this.ctx.model.User.findOne({openid},{time:1});
			return time
		}catch(err){
		}
	}

	// 获取微信
	async getWechat( gender ) {
		let data, num;
		try{
			if(gender === '男'){
				data = await this.ctx.model.Wechat.find({gender:'女'})
				// 生成随机整数
				num = getRandom(data.length);
				return data[num]
			}
		}catch(err) {

		}finally{
			if(data.length == !0){
				await this.ctx.model.Wechat.findOneAndDelete({_id: data[num]._id})
			}
		}
	}

	// 获取人数
	async getNum () {
		try{
			let male = await this.ctx.model.Wechat.find({gender:'男'}).count();
			let female = await this.ctx.model.Wechat.find({gender:'女'}).count();
			return {male, female};
		}catch(err){

		}
	}
}
module.exports = Get;
