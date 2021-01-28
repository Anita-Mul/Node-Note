## Node.js �¼�ѭ��
###### ��ֹ�¼�ѭ����
 - �κλ���̫��ʱ����ܽ�����Ȩ���ص��¼�ѭ����JavaScript���룬������ֹҳ�����κ�JavaScript�����ִ�У�������ֹUI�̣߳������û��޷��������������ҳ��ȡ�
###### һ���򵥵��¼�ѭ��˵����
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127173109231.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
 - ÿ�ε����е��¼�ѭ������鿴���ö�ջ���Ƿ��ж�������ִ������
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127173248444.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
 ***
 ## Process.nextTick��setImmediate������
  - nextTick����ִ���굱ǰ���������ִ��
  - setImmediate��������һ��tick��ִ��
 
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127231826211.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127231959168.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127232006420.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127232539793.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127232605749.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
***
## ����Javascript��ʱ��
 - setTimeout() ������һ���¹��ܣ����Դ��ݲ���
	![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127233709813.png)
 - ͨ��clearInterval��setInterval�ص������ڲ����е��ã���ʹ���Զ�ȷ�����ٴ����л���ֹͣ��
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127234442314.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
 - `setImmediate()`���൱��ʹ��`setTimeout(() => {}, 0)`

![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127235102885.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127235159309.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
***
## JavaScript�첽��̺ͻص�
 - ���������ڵȴ������������Ӧʱ�����޷����������֮ǰֹͣ��������
 - JavaScriptĬ���������ͬ���ģ������ǵ��̵߳ġ�����ζ�Ŵ����޷��������̲߳����ܲ������С�
	```javascript
	const a = 1
	const b = 2
	const c = a * b
	console.log(c)
	doSomething()
	```
 - �����Node.js�����˷�����I / O�������Խ��ø�����չ���ļ����ʣ�������õȡ�
 - ����ص��еĴ���
	```javascript
	fs.readFile('/file.json', (err, data) => {
	  if (err !== null) {
	    //handle error
	    console.log(err)
	    return
	  }
	
	  //no errors, process data
	  console.log(data)
	})
	```
## �˽�Javascript��ŵ
 - Promisifying
	```javascript
	const fs = require('fs')
	
	const getFile = (fileName) => {
	  return new Promise((resolve, reject) => {
	    fs.readFile(fileName, (err, data) => {
	      if (err) {
	        reject(err)  // calling `reject` will cause the promise to fail with or without the error passed as an argument
	        return        // and we don't want to go any further
	      }
	      resolve(data)
	    })
	  })
	}
	
	getFile('/etc/passwd')
	.then(data => console.log(data))
	.catch(err => console.error(err))
	```
 - ������ŵ
	```javascript
	const status = response => {
	//fetch()����һ��response������������������������õ������ڣ�
	//status��һ����ʾHTTP״̬�������ֵ
	//statusText��״̬��Ϣ����OK�����Ƿ�ɹ�
	  if (response.status >= 200 && response.status < 300) {
	    return Promise.resolve(response)
	  }
	  return Promise.reject(new Error(response.statusText))
	}
	
	// response����һ��json()�������÷�������һ��promise����promise���봦��ת��ΪJSON����������һ�����
	const json = response => response.json()
	
	fetch('/todos.json')
	  .then(status)    // note that the `status` function is actually **called** here, and that it **returns a promise***
	  .then(json)      // likewise, the only difference here is that the `json` function here returns a promise that resolves with `data`
	  .then(data => {  // ... which is why `data` shows up here as the first parameter to the anonymous function
	    console.log('Request succeeded with JSON response', data)
	  })
	  .catch(error => {
	    console.log('Request failed', error)
	  })
	```
 - ��������
	```javascript
	new Promise((resolve, reject) => {
	  throw new Error('Error')
	})
	  .catch(err => {
	    throw new Error('Error')
	  })
	  .catch(err => {
	    console.error(err)
	  })
	```
 - `Promise.all()`
	Promise.all���Խ����Promiseʵ����װ��һ���µ�Promiseʵ����ͬʱ���ɹ���ʧ�ܵķ���ֵ�ǲ�ͬ�ģ��ɹ���ʱ�򷵻ص���һ��������飬��ʧ�ܵ�ʱ���򷵻����ȱ�rejectʧ��״̬��ֵ��
	```javascript
	let p1 = new Promise((resolve, reject) => {
	  resolve('�ɹ���')
	})
	
	let p2 = new Promise((resolve, reject) => {
	  resolve('success')
	})
	
	let p3 = Promse.reject('ʧ��')
	
	Promise.all([p1, p2]).then((result) => {
	  console.log(result)               //['�ɹ���', 'success']
	}).catch((error) => {
	  console.log(error)
	})
	
	Promise.all([p1,p3,p2]).then((result) => {
	  console.log(result)
	}).catch((error) => {
	  console.log(error)      // ʧ���ˣ���� 'ʧ��'
	})
		```
 - Promise.race()
	����˼�壬Promse.race�������ܵ���˼����˼����˵��Promise.race([p1, p2, p3])�����ĸ������õĿ죬�ͷ����Ǹ���������ܽ�������ǳɹ�״̬����ʧ��״̬��
	```javascript
	let p1 = new Promise((resolve, reject) => {
	  setTimeout(() => {
	    resolve('success')
	  },1000)
	})
	
	let p2 = new Promise((resolve, reject) => {
	  setTimeout(() => {
	    reject('failed')
	  }, 500)
	})
	
	Promise.race([p1, p2]).then((result) => {
	  console.log(result)
	}).catch((error) => {
	  console.log(error)  // �򿪵��� 'failed'
	})
	```
 - ��������
	`Uncaught TypeError`��δ���岻��һ����ŵ
	��ȷ��ʹ��new Promise()������Promise()
***
## ����Async��Await���ִ��첽JavaScript
 - async / await������promises֮��
 - һ���򵥵�����
```javascript
const doSomethingAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('I did something'), 3000)
  })
}

const doSomething = async () => {
  console.log(await doSomethingAsync())
}

console.log('Before')
doSomething()
console.log('After')


�����
Before
After
I did something
```
 - ���κκ���֮ǰ��async��ζ�ź���������һ��promise
	```javascript
	const aFunction = async () => {
	  return 'test'
	}
	
	aFunction().then(alert) // This will alert 'test'
	
	�����ڣ�
	const aFunction = () => {
	  return Promise.resolve('test')
	}
	
	aFunction().then(alert) // This will alert 'test'
	```
- ��promise�����await/async
```javascript
const getFirstUserData = () => {
  return fetch('/users.json') // get users list
    .then(response => response.json()) // parse JSON
    .then(users => users[0]) // pick first user
    .then(user => fetch(`/users/${user.name}`)) // get user data
    .then(userResponse => userResponse.json()) // parse JSON
}

getFirstUserData()

��д��
const getFirstUserData = async () => {
  const response = await fetch('/users.json') // get users list
  const users = await response.json() // parse JSON
  const user = users[0] // pick first user
  const userResponse = await fetch(`/users/${user.name}`) // get user data
  const userData = await userResponse.json() // parse JSON
  return userData
}

getFirstUserData()
```
***
## Node.js �¼�������
 - Node.jsģ��Ϊ�����ṩ��eventsģ��
 - ��ģ���ṩ��`EventEmitter`���ڴ����¼�����
	```javascript
	const EventEmitter = require('events')
	const eventEmitter = new EventEmitter()
	```
 - emit���ڴ����¼�
	on������ӽ����¼�����ʱִ�еĻص�����
```javascript
eventEmitter.on('start', () => {
  console.log('started')
})
eventEmitter.emit('start')

//���Դ��ݲ�����
eventEmitter.on('start', number => {
  console.log(`started ${number}`)
})

eventEmitter.emit('start', 23)

//���Դ��ݶ������
eventEmitter.on('start', (start, end) => {
  console.log(`started from ${start} to ${end}`)
})

eventEmitter.emit('start', 1, 100)
```
 - `once()`�����һ���Լ�����
	`removeListener()/ off()`�����¼���ɾ���¼�������
	`removeAllListeners()`��ɾ���¼�������������
