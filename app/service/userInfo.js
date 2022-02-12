const Service = require('egg').Service;

class UserService extends Service {
  async getUserOpenid( code ) {
     let appid = 'wx8f16f3cd1c3160ae';
     let secret = '7ac0e7078d57ad4fce3dac727b82bdd2';


      let { ctx } = this;
      let result = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,{
          method: 'GET',
          dataType:'json'
      });
    return result.data;
  }
}

module.exports = UserService;