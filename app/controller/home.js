'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let { query, params, response} = ctx;
    response.status = 200;
    ctx.set('Content-type','text/html')

    ctx.body = '<h1>adsadsd</h1>';
  }
}

module.exports = HomeController;
