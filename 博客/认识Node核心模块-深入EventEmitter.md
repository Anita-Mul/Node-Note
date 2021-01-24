node 采用了事件驱动机制，而EventEmitter 就是node实现事件驱动的基础。在EventEmitter的基础上，node 几乎所有的模块都继承了这个类，以实现异步事件驱动架构。继承了EventEmitter的模块，拥有了自己的事件，可以绑定／触发监听器，实现了异步操作。EventEmitter是node事件模型的根基，由EventEmitter为基础构建的事件驱动架构处处体现着异步编程的思想，因此，我们在构建node程序时也要遵循这种思想。EventEmitter实现的原理是观察者模式，这也是实现事件驱动的基本模式。本文将围绕EventEmitter，从中探讨它的原理观察者模式、体现的异步编程思想以及应用。
<br/>
### 正文
***
##### events模块的EventEmitter类
node 的events模块只提供了一个EventEmitter类，这个类实现了node异步事件驱动架构的基本模式——观察者模式，提供了绑定事件和触发事件等事件监听器模式一般都会提供的API：

```javascript
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()

function callback() {
    console.log('触发了event事件！')
}
myEmitter.on('event', callback)
myEmitter.emit('event')
myEmitter.removeListener('event', callback);
```
只要继承`EventEmitter`类就可以拥有事件、触发事件等，所有能触发事件的对象都是 `EventEmitter` 类的实例。

而观察者模式(事件发布／订阅模式)就是实现`EventEmitter`类的基本原理，也是事件驱动机制基本模式。
<br/>

##### 事件驱动原理：观察者模式
***
在事件驱动系统里，事件是如何产生的？一个事件发生为什么能”自动”调用回调函数？我们先看看观察者模式。<br/>
观察者(Observer)模式是一种设计模式，应用场景是当一个对象的变化需要通知其他多个对象而且这些对象之间需要松散耦合时。在这种模式中，被观察者(主体)维护着一组其他对象派来(注册)的观察者，有新的对象对主体感兴趣就注册观察者，不感兴趣就取消订阅，主体有更新的话就依次通知观察者们。说猿话就是：<br/>

```javascript
function Subject() {
    this.listeners = {}
}

Subject.prototype = {
    // 增加事件监听器
    addListener: function(eventName, callback) {
        if(typeof callback !== 'function')
            throw new TypeError('"listener" argument must be a function')

        if(typeof this.listeners[eventName] === 'undefined') {
            this.listeners[eventName] = []
        } 
        this.listeners[eventName].push(callback) // 放到观察者对象中
    },
    // 取消监听某个回调
    removeListener: function(eventName, callback) {
        if(typeof callback !== 'function')
            throw new TypeError('"listener" argument must be a function')
        if(Array.isArray(this.listeners[eventName]) && this.listeners[eventName].length !== 0) {
            var callbackList = this.listeners[eventName]
            for (var i = 0, len=callbackList.length; i < len; i++) {
                if(callbackList[i] === callback) {
                    this.listeners[eventName].splice(i,1)     // 找到监听器并从观察者对象中删除
                }
            }

        }
    },
    // 触发事件：在观察者对象里找到这个事件对应的回调函数队列，依次执行
    triggerEvent: function(eventName,...args) {
        if(this.listeners[eventName]) {
            for(var i=0, len=this.listeners[eventName].length; i<len; i++){
                this.listeners[eventName][i](...args)
            }
        }
    }
}
```
OK，我们现在来添加监听器和发送事件：

```javascript
var event = new Subject()
function hello() {
    console.log('hello, there')
}
event.addListener('hello', hello)
event.triggerEvent('hello')     //    输出 hello, there
event.removeListener('hello', hello) // 取消监听
setTimeout(() => event.triggerEvent('hello'),1000) // 过了一秒什么也没输出
```
在观察者模式中，注册的回调函数即事件监听器，触发事件调用各个回调函数即是发布消息。<br/>
你可以看到，观察者模式只不过维护一个信号对应函数的列表，可以存，可以除，你只要给它信号(索引)，它就按照这个信号执行对应的函数，也就相当于间接调用了。那直接调用函数不就行了，干嘛写的那么拐弯抹角？刚才也说了，这是因为观察者模式能够解耦对象之间的关系，实现了表示层和数据逻辑层的分离，并定义了稳定的更新消息传递机制。<br/>
回到开始的问题，事件是如何产生又“自动”被调用的？是像上面那样当调用event.triggerEvent的时侯产生的吗？并不是，调用event.triggerEvent就相当于调用了回调函数，是事件执行过程，而事件产生过程则更多由底层来产生并通知给node的。我们拿node的全局变量 process来举例，process是EventEmitter的实例：

```javascript
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```
node执行时会在process的exit事件上绑定你指定的回调，相当于调用了上面的addListener，而当你退出进程时，你会发现你指定的函数被执行了，但是你没有手动调用触发exit事件的方法，也就是上面的triggerEvent，这是因为node底层帮你调用了——操作系统底层使这个进程退出了，node会得到这个信息，然后触发事先定义好的触发方法，回调函数就因此依次执行了。像这样的内置事件是node模块事先写好并开放出来的，使用时直接绑定回调函数即可，如果要自定义事件，那就得自己发送信号了。<br/>
上面代码实现了最基本的观察者模式，**node 源码中EventEmitter的实现原理跟这差不多**，除了这些还加入了其他有用的特性，而且各种实现都尽可能使用性能最好的方式(node源码真是处处反映着智慧的光芒)。<br/>
node中众多模块都继承了EventEmitter，比如文件模块系统下的FSWatcher：

```javascript
const EventEmitter = require('events')
const util = require('util')
...

function FSWatcher() {
  EventEmitter.call(this);// 调用构造函数
  ...
}
util.inherits(FSWatcher, EventEmitter); // 继承 EventEmitter
```
其他模块也是如此。它们一同组成了node的异步事件驱动架构。
<br/>
##### 异步编程范式
***
可以看到，由于采用事件模型和异步I／O，node中大量模块的API采用了异步回调函数的方式，底层也处处体现了异步编程的方式。虽然异步也带来了很多问题——理解困难、回调嵌套过深、错误难以捕捉、多线程编程困难等，不过相比于异步带来的高性能，加上这些问题都有比较好的解决方案，异步编程范式还是很值得尝试的，尤其对于利用node构建应用程序的时候。

###### 从最基本的回调函数开始

回调函数是异步编程的体现，而回调函数的实现离不开高阶函数。得益于javascript语言的灵活性，函数作为参数或返回值，而将函数作为参数或返回值的函数就是高阶函数：

```javascript
function foo(x,bar) {
    return bar(x)
}// 对于相同的foo，传进去不同的bar就有不同的操作结果

var arr = [2,3,4,5]
arr.forEach(function(item,index){
    // do something for every item
}) // 数组的高阶函数

event.addListener('hello', hello) // 还有上面观察者模式实现的addListener
```
基于高阶函数的特性，就可以实现回调函数的模式。实际上，正式因为javascript函数用法非常灵活，才有高阶函数和众多设计模式。

###### 采用事件发布／订阅模式(观察者模式)
单纯地使用高阶函数特性不足以构建简单、灵活、强大的异步编程模式的应用程序，我们需要从其他语言借鉴一些设计模式。就像上面提到的，node的events模块实现了事件发布／订阅模式，这是一种广泛用于异步编程的模式。它将回调函数事件化，将事件与各回调函数相关联，注册回调函数就是添加事件监听器，这些事件监听器可以很方便的添加、删除、被执行，使得事件和处理逻辑（注册的回调函数）之间轻松实现关联和解耦——事件发布者无需关注监听器是如何实现业务逻辑的，也不用关注有多少个事件监听器，只需按照消息执行即可，而且数据通过这种消息的方式可以灵活的传递。<br/>
不仅如此，这种模式还可以实现像类一样的对功能进行封装：将不变的逻辑封装在内部，将需要自定义、容易变化的部分通过事件暴露给外部定义。Node中很多对象大多都有这样黑盒子的特点，通过事件钩子，可以使使用者不用关注这个对象是如何启动的，只需关注自己关注的事件即可。<br/>
像大多数node核心模块一样，继承EventEmitter，我们就可以使用这种模式，帮助我们以异步编程方式构建node程序。

###### 利用promise
Promise是CommonJs发布的一个规范，它的出现给异步编程带来了方便。Promise所作的只是封装了异步调用、嵌套回调，使得原本复杂嵌套逻辑不清的回调变得优雅和容易理解。有了Promise的封装，你可以这样写异步调用：

```javascript
function fn1(resolve, reject) {
    setTimeout(function() {
        console.log('步骤一：执行');
        resolve('1');
    },500);
}

function fn2(resolve, reject) {
    setTimeout(function() {
        console.log('步骤二：执行');
        resolve('2');
    },100);
}

new Promise(fn1).then(function(val){
    console.log(val);
    return new Promise(fn2);
}).then(function(val){
    console.log(val);
    return 33;
}).then(function(val){
    console.log(val);
});
```


