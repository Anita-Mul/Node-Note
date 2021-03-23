const mongoose = require('mongoose');


/**
 * npm install --save mongoose
 * 在cmd中输入mongo可以显示连接数据库的端口号
 * mongodb://127.0.0.1:27017/edu
 */
mongoose.connect('mongodb://localhost/testLog', { useNewUrlParser: true, useUnifiedTopology: true });

const LogSchema = mongoose.Schema({
    // 标准的日志数据库表结构
    // uid: { type: String, required: true },
    // real_name: { type: String, required: true },
    // insert_time: { type: Date, required: true, default: Date.now },
    // url: { type: String, required: true },
    // is_success: { type: Boolean, required: true },
    message: { type: String, required: true },
});


const TestLog = mongoose.model('TestLog', LogSchema);
export default TestLog;


