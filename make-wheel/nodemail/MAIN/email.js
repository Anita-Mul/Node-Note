var nodemailer = require('nodemailer');
var artTemplate = require('art-template');

/**
 * 封装email.js
 * const emailService = require('./lib/email.js')(credentials);
 * 第一个参数是发送的对象，第二个参数是发送的标题
 * emailService.send('anita_sun@126.com, 2659580957@qq.com', 'Hood River tous on sale today');
 * auth: {
			user: credentials.gmail.user,
			pass: credentials.gmail.password,
	 }

   user: '2659580957@qq.com', 
   pass: 'fnseppmezgnvdjai', // 这里的密码是smtp授权码 
 */
module.exports = function(credentials){
	var mailTransport = nodemailer.createTransport({
    secure: false, // true for 465, false for other ports,
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表 https://nodemailer.com/smtp/well-known/
    port: 587,     // 这个可以自己去查出来
    secureConnection: true, // 使用了 SSL 
    auth: {
      user: credentials.gmail.user, 
      pass: credentials.gmail.password, // 这里的密码是smtp授权码 
    }
	});

	var from = '"Fred Foo 👻" <2659580957@qq.com>';
  // 如果发生错误的接受者
	var errorRecipient = '2659580957@qq.com';

	return {
		send: function(to, subj, body){

        const template = artTemplate(__dirname + '/email.art', {
          content: body,
        });
		    mailTransport.sendMail({
		        from: from,
		        to: to,
		        subject: subj,
		        html: template,
		        generateTextFromHtml: true
		    }, (error, info) => {
		        if(error) console.error('Unable to send email: ' + err);
            console.log('Message sent: %s', info.messageId);
		    });
		},

    // 如果网站中有错误，可以这样做
    /**
     * if(err) {
     *  email.sendError('XXX');
     *  // 给用户显示错误消息
     * }
     * 
     * 或者：
     * try {
     *  // 在这里做些不确定的事情...
     * }
     * catch(ex) {
     *  email.sendError('');
     *  // ... 给用户显示错误消息
     * }
     */
		emailError: function(message, filename, exception){
			var body = '<h1>Meadowlark Travel Site Error</h1>' +
				'message:<br><pre>' + message + '</pre><br>';
			if(exception) body += 'exception:<br><pre>' + exception + '</pre><br>';
			if(filename) body += 'filename:<br><pre>' + filename + '</pre><br>';
		    mailTransport.sendMail({
		        from: from,
		        to: errorRecipient,
		        subject: 'Meadowlark Travel Site Error',
		        html: body,
		        generateTextFromHtml: true
		    }, function(err){
		        if(err) console.error('Unable to send email: ' + err);
		    });
		},
	};
};
