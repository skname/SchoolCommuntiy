'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async getLoginInfo() {
    const { ctx } = this;
    let { response, request, service } = ctx;
    let { code } = request.body;
    
    // 获取 openid 
    let user = await service.userInfo.getUserOpenid(code);
    let { openid } = user;
    response.status = 200;
    ctx.body = openid;
  }
}

module.exports = LoginController;
