"use strict";
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
const { dirname, resolve } = require("path");
const ejs = require('ejs');

// 链接：https://nodemailer.com/about/
/**
 * 邮件模板的读取
 */
// const HtmlData = fs.readFileSync(path.join(__dirname, 'HTML Email编写指南.html'), function(err, data){
//   if(err){
//     console.log('错误');
//   }
//   return data;
// });

/**
 * 官网上邮件模板的读取(使用流来读取)
 * !!!!!!!!!!!!!仍然是同步异步问题，但是在发送邮件中不需要用到下面的代码
 * 直接
 * transport.sendMail({ html: fs.createReadStream("HTML Email编写指南.html") }, function(err) {
 *     if (err) {
 *       // check if htmlstream is still open and close it to clean up
 *     }
 * });
 */
// async () => {
//   var HtmlData;
//   var htmlstream = await fs.createReadStream(path.join(__dirname, "HTML Email编写指南.html"));
//   var arr = [];
//   await htmlstream.on('data', (chunk) => {
//     arr.push(chunk);
//   })
//   await htmlstream.on('end', (chunk) => {
//     HtmlData = Buffer.concat(arr).toString();
//   });
//   await htmlstream.on('error', (err) => {
//     HtmlData = '<h1>邮件未发送成功</h1>';
//   });
//   console.log(HtmlData);
// };

/**
 * 在邮件中使用ejs模板引擎
 */
const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'email.ejs'), 'utf8'));

const HtmlData = template({
  title: 'Ejs',
  desc: '使用Ejs渲染模板',
});


let transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  secure: false, // true for 465, false for other ports,
  service: 'qq', // 使用了内置传输发送邮件 查看支持列表 https://nodemailer.com/smtp/well-known/
  port: 587,     // 这个可以自己去查出来
  secureConnection: true, // 使用了 SSL 
  auth: {
    user: '2659580957@qq.com', 
    pass: 'fnseppmezgnvdjai', // 这里的密码是smtp授权码 
  },
});

let mailOptions = {
  from: '"Fred Foo 👻" <2659580957@qq.com>', // from后面的<2659580957@qq.com> 必须和上面发送的人一样，否则就会报错
  to: "anita_sun@126.com, 2659580957@qq.com", // list of receivers
  subject: "啦啦啦啦啦啦啦啦啦啦啦", // 标题
  // 如果要发送的是纯文本; 就是text，如果发送的是html，就是下面的
  // text: "Hello world?", // plain text body
  // html: '<b>hello world?</b>',
  // 可以直接这样写，是最简单的方式
  // html: fs.createReadStream("HTML Email编写指南.html"),
  //html: HtmlData.toString(),
  html: '<b>Hello world!</b>',
  // 添加附件
  attachments: [
    {   // utf-8 string as an attachment
      filename: 'text.txt',
      content: 'hello world!'
    },
    {
      filename: 'yan.jpg',
      // 这个链接也可以添加外链
      path: path.join(__dirname, 'public/yan.jpg'),
    },
    {
      filename: 'text4.txt',
      content: fs.createReadStream('HTML Email编写指南.html')
      // encoding: 'base64'
    }
  ],
  /**
   * 图片也可以使用附件的形式添加
   * html: '<img src="cid:01">',
   * attachments: [
   *   {
   *     filename: 'ZenQcode.png',
   *     path: path.resolve(__dirname, 'ZenQcode.png'),
   *     cid: '01',
   *   }
   * ]
   */
  date: new Date('2000-01-01 00:00:00'),
  // alternatives: [
  //   {
  //       // 大概就是使用markdown语法进行替换Hello World
  //       // 直接使用模板引擎就可以，不用搞那么多，烦人
  //       contentType: 'text/x-web-markdown',
  //       content: '**Hello world!**'
  //   },
  // ]

  /**
   * 电子邮件中的抄送和密送
   * 如果：A 发送邮件给B1、B2、B3，抄送给C1、C2、C3，密送给D1、D2、D3。
      那么：
      A知道自己发送邮件给了B1、B2、B3，并且抄送给了C1、C2、C3，密送给了D1、D2、D3。
      B1知道这封是A发送给B1、B2、B3的邮件，并且抄送给了C1、C2、C3，但不知道密送给了D1、D2、D3。
      C1知道这封是A发送给B1、B2、B3的邮件，并且抄送给了C1、C2、C3，但不知道密送给了D1、D2、D3。
      D1知道这封是A发送给B1、B2、B3的邮件，并且抄送给了C1、C2、C3，而且密送给了自己，但不知道密送给了D2、D3。
   */
  // 抄送
  // cc: ['foobar@example.com', '"Ноде Майлер" <bar@example.com>, "Name, User" <baz@example.com>'],
  // 密送
  // bcc: [
  //     'foobar@example.com',
  //     {
  //         name: 'Майлер, Ноде',
  //         address: 'foobar@example.com'
  //     }
  // ]

};


transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
  // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
});

// info信息包括
// info.messageId most transports should return the final Message-Id value used with this property
// info.envelope includes the envelope object for the message
// info.accepted is an array returned by SMTP transports (includes recipient addresses that were accepted by the server)
// info.rejected is an array returned by SMTP transports (includes recipient addresses that were rejected by the server)
// info.pending is an array returned by Direct SMTP transport. Includes recipient addresses that were temporarily rejected together with the server response
// response is a string returned by SMTP transports and includes the last SMTP response from the server
