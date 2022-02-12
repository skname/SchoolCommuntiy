module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        openid: {
            type: String,
            unique: true
        },
        gender:{
            type: String,
        },
        isStop: {
            type: Boolean,
            default: false
        },
        time: {
            type: Number,
            default: 3
        }
    });
    return mongoose.model('User', UserSchema);
}