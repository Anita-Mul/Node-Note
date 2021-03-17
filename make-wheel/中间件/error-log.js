import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/edu';

export default (errLog, req, res, next) => {
    //{ 错误名称, 错误信息, 错误堆栈, 错误发生时间}
    // 1.将错误日志记录到数据库,方便定位排查错误
    //打开连接
    MongoClient.connect(url, (err, client) => {
        //数据库的名字
        const db = client.db('edu');
        db
            .collection('error_logs') //里面集合的名字
            .insertOne({
                name: errLog.name,
                message: errLog.message,
                stack: errLog.stack,
                time: new Date()
            }, (err, result) => {
                if (err) {
                    throw err;
                }
                res.json({
                    err_code: 500,
                    message: errLog.message
                })
            })

        //关闭连接
        client.close();
    })
}