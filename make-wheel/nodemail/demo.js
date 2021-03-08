"use strict";
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
const { dirname, resolve } = require("path");


  const HtmlData = fs.readFileSync(path.join(__dirname, 'HTML Email编写指南.html'), function(err, data){
    if(err){
      console.log('错误');
    }
    return data;
  });

  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    secure: false, // true for 465, false for other ports,
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表 https://nodemailer.com/smtp/well-known/
    port: 587,     // 这个可以自己去查出来
    secureConnection: true, // 使用了 SSL 
    auth: {
      user: '2659580957@qq.com', 
      pass: '', // 这里的密码是smtp授权码 
    },
  });

  let mailOptions = {
    from: '"Fred Foo 👻" <2659580957@qq.com>', // from后面的<2659580957@qq.com> 必须和上面发送的人一样，否则就会报错
    to: "anita_sun@126.com, 2659580957@qq.com", // list of receivers
    subject: "啦啦啦啦啦啦啦啦啦啦啦", // 标题
    // 如果要发送的是纯文本; 就是text，如果发送的是html，就是下面的
    // text: "Hello world?", // plain text body
    // html: '<b>hello world?</b>',
    html: HtmlData.toString(),
    // 添加附件
    attachments: [
      {   // utf-8 string as an attachment
        filename: 'text.txt',
        content: 'hello world!'
      },
      {
        filename: 'yan.jpg',
        path: path.join(__dirname, 'public/yan.jpg'),
      }
    ]
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
  });
