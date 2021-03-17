import mongoose from 'mongoose';


/**
 * npm install --save mongoose
 * 在cmd中输入mongo可以显示连接数据库的端口号
 * mongodb://127.0.0.1:27017/edu
 */
mongoose.connect('mongodb://localhost/edu', { useNewUrlParser: true, useUnifiedTopology: true });

const advertSchema = mongoose.Schema({
    title: { type: String, required: true },
    images: { type: String, required: true },
    link: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    //为啥这里写的不是Date.now(),如果是Date.now()
    //一上来就要调用
    //写成这样,人家会帮你调用
    create_time: { type: Date, default: Date.now },
    last_modified: { type: Date, default: Date.now }
});


const Advert = mongoose.model('Advert', advertSchema);
export default Advert;


