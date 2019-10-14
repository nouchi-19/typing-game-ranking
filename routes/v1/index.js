const express = require('express');
// ルーティングする
const router = express.Router();

router.use('/results', require('./resultResource.js'));

//routerをモジュールとして扱う準備
module.exports = router;