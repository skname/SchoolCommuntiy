module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const WechatSchema = new Schema({
        gender: {
            type: String,
        },
        wechat: {
            type: String
        },
        introduce: {
            type: String
        }

    });
    return mongoose.model('Wechat', WechatSchema);
}