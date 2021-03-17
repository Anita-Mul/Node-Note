import express from 'express';
import Advert from '../models/advert';

// 创建一个路由容器,将所有的路由中间件挂载给路由容器
const router = express.Router();

// 数据的类型
/**
 *  · req.params一个数组，包含命名过的路由参数。
      app.get('/news/:year/:month/:day/',(req,res)=>{ res.send(req.params); });
      news/2019/3/2
    · req.query一个对象，包含以键值对存放的查询字符串参数（通常称为GET请求参数）。 
    · req.body一个对象，包含POST请求参数。这样命名是因为POST请求参数在REQUEST正文中传递，而不像查询字符串在URL中传递。要使req.body可用，需要中间件能够解析请求正文内容类型
 */


// 添加数据
const advert = new Advert({
  title: body.title,
  images: body.images,
  link: body.link,
  start_time: body.start_time,
  end_time: body.end_time,
});

advert.save((err, result) => {
  if (err) {
      return next(err);
  }
  res.json({
      err_code: 0
  })
});

// ——————————————————————————————————————————

// 删除数据
// 1. 根据条件删除所有
Advert.remove({
  username: 'xiao',
}, function(err, ret){
  if(err) {
    console.log('删除失败');
  } else {
    console.log('删除成功');
  }
});
// 2. 根据条件删除一个
Advert.findOneAndRemove(condition, [option], [callback]);
// 3. 根据id删除一个
User.findByIdAndRemove(id, [options], [callback]); 

// ——————————————————————————————————————————

// 更新（改）
// 更新所有：
User.remove(conditions, doc, [options], [callback]);

// 根据指定条件更新一个：
User.FindOneAndUpdate([conditions],[update],[options],[callback]);

// 根据id更新一个：
// 更新	根据id来修改表数据
User.findByIdAndUpdate('5e6c5264fada77438c45dfcd', {
	username: 'junjun'
}, function(err, ret) {
	if (err) {
		console.log('更新失败');
	} else {
		console.log('更新成功');
	}
});

// ————————————————————————————————————————————————————————

// 查询（查）
// 查询所有
User.find(function(err,ret){
	if(err){
		console.log('查询失败');
	}else{
		console.log(ret);
	}
});

// 根据条件查询
User.find({ username:'xiaoxiao' },function(err,ret){
	if(err){
		console.log('查询失败');
	}else{
		console.log(ret);
	}
});

// 按照条件查询单个，查询出来的数据是一个对象（{}）
// 没有条件查询使用findOne方法，查询的是表中的第一条数据
User.findOne({
	username: 'xiaoxiao'
}, function(err, ret) {
	if (err) {
		console.log('查询失败');
	} else {
		console.log(ret);
	}
});

