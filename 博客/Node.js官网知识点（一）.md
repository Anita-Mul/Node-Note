1. V8��֧��Google Chrome�������JavaScript��������ơ�V8�ṩ������JavaScript������ʱ������
2. ����˳�Node.js����
	 �� �ڿ���̨��ctrl + c
	 �� `process`����ģ���ṩ��`process.exit()`
	 �� �ɹ��˳���`process.exit(0);`
	 �� ʧ���˳���`process.exit(1);`
	 �� Ҳ��������`process.exitCode = 1;`
	 �� ���ʹ��`process.exit()`����ô�κε�ǰ��������������е����󶼽�����ֹ���ⲻ�á�
	 �� Ҳ������������SIGTERM�ź�
	```javascript
	//����node app.js
	//����node test.js����ֹ��
	//app.js
	//SIGTERM�Ǹ��߽���������ֹ���ź�
	const express = require('express')

	const app = express()
	
	app.get('/', (req, res) => {
	    //console.log(process.pid);
	    res.send(process.pid)
	})
	
	const server = app.listen(3000, () => console.log('Server ready'))
	
	process.on('SIGTERM', () => {
	    server.close(() => {
	        console.log('Process terminated')
	    })
	})
	```
	```javascript
	//test.js
	process.kill(18236, 'SIGTERM')
	//process.kill(process.pid, 'SIGTERM')
	```
3. ���ʹ��Node.js REPL
	ֱ���ڿ���̨����node���Դ�������
	�ڱ�д�����ʱ�����tab������REPL�������Զ���д
	����JavaScript������ƣ�����Number�����һ���㲢��tab������ʾ�������е����Ժͷ���
	![���������ͼƬ����](https://img-blog.csdnimg.cn/20210126210820974.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
ͨ��ȫ�ּ���global. ��tab
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210126210939378.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210126211004421.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
�����һ������֮�󣬰���Enter����REPL���Զ���ת��...��ͷ������
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210126211045882.png)
4. Node.js���������н��ղ���
	![���������ͼƬ����](https://img-blog.csdnimg.cn/20210126212453178.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
	```javascript
	// ��һ��Ԫ����node���������·����
	// �ڶ���Ԫ��������ִ�е��ļ�������·����
	// �ӵ�����λ�ÿ�ʼ�������������������ڡ�
	
	//�ų�ǰ����������������
	const args = process.argv.slice(2)

	//node app.js joe
	const args = process.argv.slice(2)
	args[0]

	//node app.js name=joe
	const args = require('minimist')(process.argv.slice(2))
	args['name'] //joe
	```

5. ʹ��Node.js�����������
	```javascript
	����������������������������������������������������������������
	//��տ���̨
	console.clear()
	����������������������������������������������������������������
	//�����������������count()����������ַ������������:���ټ���count()�����ַ������ֵĸ���
	const x = 1
	const y = 2
	const z = 3
	console.count(
	    'The value of x is ' + x +
	    ' and has been checked .. how many times?'
	)
	console.count(
	    'The value of x is ' + x +
	    ' and has been checked .. how many times?'
	)
	console.count(
	    'The value of y is ' + y +
	    ' and has been checked .. how many times?'
	)
	// The value of x is 1 and has been checked .. how many times?: 1
	// The value of x is 1 and has been checked .. how many times?: 2
	// The value of y is 2 and has been checked .. how many times?: 1
	��������������������������������������������������������
	// console.trace() ��ӡ��ջ����
	const function2 = () => console.trace()
	const function1 = () => function2()
	function1()
	/*
	Trace
	    at function2 (repl:1:33)
	    at function1 (repl:1:25)
	    at repl:1:1
	    at ContextifyScript.Script.runInThisContext (vm.js:44:33)
	    at REPLServer.defaultEval (repl.js:239:29)
	    at bound (domain.js:301:14)
	    at REPLServer.runBound [as eval] (domain.js:314:12)
	    at REPLServer.onLine (repl.js:440:10)
	    at emitOne (events.js:120:20)
	    at REPLServer.emit (events.js:210:7) */
	������������������������������������������������������������
	
	// ���㻨�ѵ�ʱ��
	const doSomething = () => 	console.log('test')
	const measureDoingSomething = () => {
	    console.time('doSomething()')
	    //do something, and measure the time it takes
	    doSomething()
	    console.timeEnd('doSomething()')
	}
	measureDoingSomething() 
	/*
	test
	doSomething(): 4.260ms
	*/
	
	������������������������������������������������������������������������

	// Ϊ������ɫ
	//����ǵײ�ԭ��
	console.log('\x1b[33m%s\x1b[0m', 'hi!') 
	
	//���� npm install chalk
	const chalk = require('chalk')
	console.log(chalk.yellow('hi!'))

	������������������������������������������������������������������������
	// ������������npm install progress��
	// �˴���δ�����һ��10����������ÿ100�������һ�β����������ʱ��������������
	const ProgressBar = require('progress')

	const bar = new ProgressBar(':bar', { total: 10 })
	const timer = setInterval(() => {
	    bar.tick()
	    if (bar.complete) {
	        clearInterval(timer)
	    }
	}, 100)
	
	```
6. ��������Node.js�����е�����
	�� �ṩ��`readline`ģ��
	```javascript
	const readline = require('readline').createInterface({
	  input: process.stdin,
	  output: process.stdout
	})
	
	readline.question(`What's your name?`, name => {
	  console.log(`Hi ${name}!`)
	  readline.close()
	})
	```
	�� `Inquirer.js`������ִ��������������ѯ�ʶ���ѡ�񣬾��е�ѡ��ť��ȷ�ϵȣ���һ�����ѡ��
	```javascript
	const inquirer = require('inquirer')
	
	var questions = [
	  {
	    type: 'input',
	    name: 'name',
	    message: "What's your name?"
	  }
	]
	
	inquirer.prompt(questions).then(answers => {
	  console.log(`Hi ${answers['name']}!`)
	})
	```
	[inquirier](https://www.npmjs.com/package/inquirer?activeTab=readme)	