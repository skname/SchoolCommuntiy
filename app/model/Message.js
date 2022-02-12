module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const MessageSchema = new Schema({
        name: {
            type:String,
            index: 1
        },
        message: {
            type: String
        },
        time: {
            type: String
        }
    });
    return mongoose.model('Message', MessageSchema);
}