/**
 * 哦，我的天，下面的是错的，俺也不知道错在哪里了，以后来补哦！
 */
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var i = 0;
var url = "http://weibo.com/p/100808085ea6c29ca833b98037fc3213baa168/super_index";
//初始url 

function fetchPage(x) {     //封装了一层函数
    startRequest(x);
}


function startRequest(x) {
    //采用http模块向服务器发起一次get请求      
    http.get(x, function (res) {
        var html = '';        //用来存储请求网页的整个html内容
        var titles = [];
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {

            var $ = cheerio.load(html); //采用cheerio模块解析html
            i = i + 1;

            $('.media_box img').each(function (index, item) {
                var img_title = (Math.random() * (1000000000 - 0 + 1)).toString();
                var img_filename = img_title + '.jpg';

                var img_src = 'http:' + $(this).attr('src'); //获取图片的url
                img_src = img_src.indexOf('/thumb150/') ? img_src.replace('thumb150', 'mw690') : img_src.replace('orj360', 'mw690');

                //采用request模块，向服务器发起一次请求，获取图片资源
                request.head(img_src, function (err, res, body) {
                    if (err) {
                        console.log(err);
                    }
                });
                request(img_src).pipe(fs.createWriteStream('./image/' + news_title + '---' + img_filename));     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
            })

            //下一篇文章的url
            var nextLink = "http://weibo.com" + $(".W_pages a").attr('href');

            if (i <= 10) {
                fetchPage(nextLink);
            }

        });

    }).on('error', function (err) {
        console.log(err);
    });

}

fetchPage(url);      //主程序开始运行
