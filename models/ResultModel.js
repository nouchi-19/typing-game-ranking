const mongoose = require('mongoose'); //mongoDBに接続するためのライブラリ
const Schema = mongoose.Schema; //mongoDBのスキーマを作る
const moment = require('moment');

const resultSchema = new Schema({
    resultId: Number,
    mode: String,
    userName: String,
    allTyping: Number,
    clearTyping: Number,
    maxContinuousTyping: Number,
    perSecond: Number,
    missType: Number,
    date: String,
});

const AutoIncrement = require('mongoose-sequence')(mongoose);
resultSchema.plugin(AutoIncrement, {inc_field: 'resultId'});

resultSchema.methods.getDate = () => {
    return moment().format("YYYY-MM-DD HH:mm:ss");
};

module.exports = mongoose.model('resultModel', resultSchema);