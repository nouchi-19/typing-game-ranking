const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb', { useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex: true });
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

// mongoose-sequenceの警告一時停止
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 3000;

const router = require('./routes/v1/');
app.use('/api/v1/', router);

// app.get('/api/v1/ppap', (req, res) =>{
//     const ppap = [
//         { object:'pen', order:1 },
//         { object:'pineapple', order:2 },
//         { object:'apple', order:3 },
//         { object:'pen', order:4 }
//     ];
//     console.log(req);
//     console.log(res);
//     res.json(ppap);
// });



app.listen(port);
