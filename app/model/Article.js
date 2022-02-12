module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ArticleSchema = new Schema({
        headPhoto: {
            type:String
        },
        name: {
            type:String
        },
        type: {
            type:String,
        },
        text: {
            type:String
        },
        like:{
            type: Number
        },
        comment: {
            type: Array
        },
        imageBox: {
            type: Array
        },
        time: {
            type: String,
        },
        id: {
            type:Number,
            index: -1
        },
        openid: {
            type: String
        }
    });
    return mongoose.model('Article', ArticleSchema);
}