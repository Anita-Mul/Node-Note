## Node.js 事件循环
###### 阻止事件循环：
 - 任何花费太长时间才能将控制权返回到事件循环的JavaScript代码，都将阻止页面中任何JavaScript代码的执行，甚至阻止UI线程，并且用户无法单击浏览，滚动页面等。
###### 一个简单的事件循环说明：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127173109231.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
 - 每次迭代中的事件循环都会查看调用堆栈中是否有东西，并执行它。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127173248444.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
 ***
 ## Process.nextTick和setImmediate的区别
  - nextTick就是执行完当前代码后立即执行
  - setImmediate就是在下一个tick中执行
 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127231826211.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127231959168.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127232006420.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127232539793.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127232605749.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
***
## 发现Javascript计时器
 - setTimeout() 定义了一个新功能，可以传递参数
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127233709813.png)
 - 通常clearInterval在setInterval回调函数内部进行调用，以使其自动确定是再次运行还是停止。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127234442314.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
 - `setImmediate()`，相当于使用`setTimeout(() => {}, 0)`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127235102885.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127235159309.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
***
## JavaScript异步编程和回调
 - 当程序正在等待来自网络的响应时，它无法在请求完成之前停止处理器。
 - JavaScript默认情况下是同步的，并且是单线程的。这意味着代码无法创建新线程并不能并行运行。
	```javascript
	const a = 1
	const b = 2
	const c = a * b
	console.log(c)
	doSomething()
	```
 - 最近，Node.js引入了非阻塞I / O环境，以将该概念扩展到文件访问，网络调用等。
 - 处理回调中的错误
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
## 了解Javascript承诺
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
 - 连锁承诺
	```javascript
	const status = response => {
	//fetch()返回一个response，它具有许多属性在我们引用的属性内：
	//status，一个表示HTTP状态代码的数值
	//statusText，状态消息，即OK请求是否成功
	  if (response.status >= 200 && response.status < 300) {
	    return Promise.resolve(response)
	  }
	  return Promise.reject(new Error(response.statusText))
	}
	
	// response还有一个json()方法，该方法返回一个promise，该promise将与处理并转换为JSON的正文内容一起解析
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
 - 级联错误
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
	Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。
	```javascript
	let p1 = new Promise((resolve, reject) => {
	  resolve('成功了')
	})
	
	let p2 = new Promise((resolve, reject) => {
	  resolve('success')
	})
	
	let p3 = Promse.reject('失败')
	
	Promise.all([p1, p2]).then((result) => {
	  console.log(result)               //['成功了', 'success']
	}).catch((error) => {
	  console.log(error)
	})
	
	Promise.all([p1,p3,p2]).then((result) => {
	  console.log(result)
	}).catch((error) => {
	  console.log(error)      // 失败了，打出 '失败'
	})
		```
 - Promise.race()
	顾名思义，Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
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
	  console.log(error)  // 打开的是 'failed'
	})
	```
 - 常见错误：
	`Uncaught TypeError`：未定义不是一个承诺
	请确保使用new Promise()而不是Promise()
***
## 具有Async和Await的现代异步JavaScript
 - async / await建立在promises之上
 - 一个简单的例子
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


结果：
Before
After
I did something
```
 - 在任何函数之前加async意味着函数将返回一个promise
	```javascript
	const aFunction = async () => {
	  return 'test'
	}
	
	aFunction().then(alert) // This will alert 'test'
	
	类似于：
	const aFunction = () => {
	  return Promise.resolve('test')
	}
	
	aFunction().then(alert) // This will alert 'test'
	```
- 将promise改造成await/async
```javascript
const getFirstUserData = () => {
  return fetch('/users.json') // get users list
    .then(response => response.json()) // parse JSON
    .then(users => users[0]) // pick first user
    .then(user => fetch(`/users/${user.name}`)) // get user data
    .then(userResponse => userResponse.json()) // parse JSON
}

getFirstUserData()

改写后：
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
## Node.js 事件发射器
 - Node.js模块为我们提供了events模块
 - 此模块提供了`EventEmitter`用于处理事件的类
	```javascript
	const EventEmitter = require('events')
	const eventEmitter = new EventEmitter()
	```
 - emit用于触发事件
	on用于添加将在事件触发时执行的回调函数
```javascript
eventEmitter.on('start', () => {
  console.log('started')
})
eventEmitter.emit('start')

//可以传递参数：
eventEmitter.on('start', number => {
  console.log(`started ${number}`)
})

eventEmitter.emit('start', 23)

//可以传递多个参数
eventEmitter.on('start', (start, end) => {
  console.log(`started from ${start} to ${end}`)
})

eventEmitter.emit('start', 1, 100)
```
 - `once()`：添加一次性监听器
	`removeListener()/ off()`：从事件中删除事件监听器
	`removeAllListeners()`：删除事件的所有侦听器
