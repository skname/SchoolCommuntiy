'use strict';
const Service = require('egg').Service;
class Save extends Service {
// 保存文章
	async saveArticle( data ) {
		try {
            await this.ctx.model.Article.insertMany(data)
            return ;
		} catch (err) {
			console.log(err)
		}
	}
	
// 保存留言
	async saveMessage ( data ) {
		try{
			await this.ctx.model.Message.insertMany(data);
		}catch( err ) {
			console.log(err);
		}
	}

// 保存账号
	async saveUserInfo( args ) {
		try{
			await this.ctx.model.User.insertMany( args );
		}catch( err ) {
			return
		}
	} 
	// 保存微信
	async saveWeChat ( args ) {
		try {
			await this.ctx.model.Wechat.insertMany( args )
		}catch(err){
			console.log('这出错了' ,err)
		}
	} 
}
module.exports = Save;
