/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {

  };
  // 配置解析表单
  exports.multipart = {
    mode: 'file',
  };

  // 配置mongodb
exports.mongoose = {
  client: {
  url: 'mongodb://localhost/sktest',
  options: {
        useNewUrlParser: true,
    },
  }
}
// 配置 cluster 模块
  config.cluster = {
    listen: {
      path: '',
      port: 3000,
      hostname: '127.0.0.1',
    }
  }
// 关掉 csrf 安全检测
  config.security = {
    csrf: false
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_sk080204';

  // add your middleware config here
  config.middleware = [];
  // add your user config here

  const userConfig = {
    myAppName: 'community',
  };
  return {
    ...config,
    ...userConfig,
  };
};
