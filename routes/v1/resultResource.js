const express = require('express');
const router = express.Router();
const resultModel = require('../../models/ResultModel.js');

router.post('/', (req, res) => {

    // モデル作成．
    const result = new resultModel();
    // データを詰め込む

    // todo
    // 変数挿入で下記のシリアライズできるようにモジュール化
    const request = req.body;
    result.mode = request.mode;
    result.userName = request.userName;
    result.allTyping = request.allTyping;
    result.clearTyping = request.clearTyping;
    result.maxContinuousTyping = request.maxContinuousTyping;
    result.perSecond = request.perSecond;
    result.missType = request.missType;
    result.date = result.getDate();

    // 保存処理
    result.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.status(201).json(result);
        }
    });
});

router.get('/', (req, res) => {
    const query = req.query;
    resultModel
        .find(query)
        .then((result) => {
            return res.json(result);
        }).catch(e => {
        if (e instanceof NotFound) {
            return res.status(404).json(e);
        }
        return res.json(e);
    });
});

router.get('/:resultId', (req, res) => {
    const resultId = req.params.resultId;
    resultModel
        .findOne({resultId: resultId})
        .then((result) => {
            if (!result) {
                throw new NotFound();
            }
            return res.json(result);
        }).catch(e => {
        if (e instanceof NotFound) {
            return res.status(404).json(e);
        }
        return res.json(e);
    });
});

router.delete('/:resultId', (req, res) => {
    const resultId = req.params.resultId;
    resultModel.remove({resultId: resultId})
        .then(() => {
            res.json({message: 'success'});
        });
});


class NotFound extends Error {
    constructor(message) {
        super(message);
        this.description = message;
        this.name = 'NotFound';
        this.status = 404;
    }
}

module.exports = router;