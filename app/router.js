'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 登录
  router.post('/login', controller.login.getLoginInfo);
  // 发表文章
  router.post('/publicArticle', controller.public.publicArticle);
  // 获取文章
  router.get('/getArticle', controller.get.getArticle);
  // 懒加载
  router.post('/getLoadArticle', controller.get.getLoadArticle);
  // 上传图片
  router.post('/uploadImage', controller.public.uploadImage);
  // 更新评论
  router.put('/updataComment', controller.updata.updataComment);
  // 提交留言
  router.post('/publicMessage', controller.public.publicMessage);
  // 获取留言
  router.get('/getMessage', controller.get.getMessage);
  // 点赞
  router.put('/updateLike', controller.updata.updateLike);
  //判断是否封号
  router.get('/isfenghao',controller.get.isfenghao);
  // 保存信息
  router.post('/saveUserInfo',controller.public.saveUserInfo);
  // 获取性别
  router.get('/getGender',controller.get.getGender);
  // 获取次数
  router.get('/getTime', controller.get.getTime);
  // 保存微信 
  router.post('/saveWeChat', controller.public.saveWeChat);
  // 获取微信
  router.get('/getWeChat', controller.get.getWechat);
  // 获取人数
  router.get('/getNum', controller.get.getNum)
};
