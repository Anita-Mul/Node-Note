import queryString from 'querystring'

// 自己解析post表单请求体,不需要body-parser
export default (req, res, next) => {

    // req.headers 可以拿到当前请求的请求报文头信息
    if (req.method.toLowerCase() === 'get' ||
        req.headers['content-type'].startsWith('multipart/form-data')) {
        //如果没有return,虽然调用了next,但还是会往下执行
        return next();
    }

    let data = '';

    req.on('data', chuck => {
        data += chuck;
    });

    req.on('end', () => {
        // 手动给req对象挂载一个body书写,值就是当前POST请求体对象
        req.body = queryString.parse(data);
        next();
    })
};