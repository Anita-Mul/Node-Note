## 到底什么是流
流是数据的集合 - 就像数组或者字符串。差异就是流可能不是一次性获取到的，它们不需要匹配内存。这让流在处理大容量数据，或者从一个额外的源每次获取一块数据的时候变得非常强大。

然而，流不仅可以处理大容量的数据。它们也给了我们在代码中组合的能力。就像在我们可以通过导入其他一些更小的 Linux 命令那样组合出强大的 Linux 命令。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021012409260983.png)

```javascript
const grep = ... // grep 输出流
const wc = ... // wc 输入流
grep.pipe(wc)
```
很多在 Node.js 内置的模块都实现了流接口：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210124092750875.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
上面列表中有些原生的 Node.js 对象是可读或者可写的流，它们中的一些即是可读的也是可写的流，比如 TCP sockets，zlib，crypto 流。

请注意，对象也密切相关。虽然HTTP响应是客户端上的可读流，但它是服务器上的可写流。这是因为在HTTP情况下，我们基本上是从一个对象（http.IncomingMessage）读取并写入另一个对象（http.ServerResponse）。

注意，当出现子进程时，子进程的标准输入输出流（stdin，stdout，stderr）有着相反的流类型。这允许以非常方便的方式从主进程输入输出流导入到子进程的输入输出流中。

## 一个流实例
理论很好，但是没有百分百的说服力。让我们看一个例子，展示了不同的流在代码中内存消耗。

让我们首先创建一个大文件：

```javascript
const fs = require('fs');
const file = fs.createWriteStream('./big.file');
for(let  i = 0;i<=1e6;i++) {
    file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit. \n');
}
file.end();
```
我们用可写流创建了一个大文件

该fs模块可以使用流接口来读取和写入文件。在上面的示例中，我们使用可写流通过循环来将100万行数据写入文件(big.file)。

运行上面的脚本会生成一个大约400 MB的文件。

下面是一个简单的Node Web服务器，专门用于读取big.file文件：

```javascript
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  fs.readFile('./big.file', (err, data) => {
    if (err) throw err;
  
    res.end(data);
  });
});

server.listen(8000);
```
当服务器收到请求后，将使用异步方法来读取文件（fs.readFile）。但是，这并不是说我们要阻塞事件循环或其它事情。每件事情都很棒，对吗？

在没有运行服务器的时候，它的内存为8.7MB：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210124100306648.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
好，现在让我们连接并运行服务器，看看内存会发生什么变化。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021012410095167.gif#pic_center)
哇哦，内存消耗一直升到434.8MB。
我们先将整个big.file的内容储存在了内存中，然后将其写入到了响应对象中。这样做效率是非常低的。

HTTP响应对象（res 在上面的代码中）是可写流。这意味着如果我们利用`fs.createReadStream`
将big.file转化为一个可读流的实例，通过使用`pipe`方法将两者连同，得到的结果相同，而且无需消耗434.8MB的内存

```javascript
const fs = require('fs');
const server = require('http').createServer();

[video(video-6Fyg0GvV-1611461471329)(type-bilibili)(url-https://player.bilibili.com/player.html?aid=756341502)(image-https://ss.csdn.net/p?http://i2.hdslb.com/bfs/archive/ed75c1dc55c056321f562a8caf5bf41827a7d596.jpg)(title-8122e7e4-232a-11eb-b843-62b7e39548a1)]

server.on('request', (req, res) => {
  const src = fs.createReadStream('./big.file');
  src.pipe(res);
});

server.listen(8000);
```
现在，当您连接到该服务器时，发生了一件神奇的事情（请查看内存消耗）：


[video(video-ZqonskJ2-1611461488533)(type-bilibili)(url-https://player.bilibili.com/player.html?aid=756341502)(image-https://ss.csdn.net/p?http://i2.hdslb.com/bfs/archive/ed75c1dc55c056321f562a8caf5bf41827a7d596.jpg)(title-8122e7e4-232a-11eb-b843-62b7e39548a1)]

发生了什么？
当客户端请求该大文件时，我们一次流入一个数据块，意味着再也不用在内存中，缓存整个大文件了。内存的使用量增加了约25MB。

可以将这个例子推到极限。重新生成big.file是500万行而不是100万行，这将使文件超过2 GB，这实际上大于Node中的默认缓冲区限制。

如果您尝试使用fs.readFile来读取该文件，则默认情况下完全无法实现（您可以更改限制）。但是fs.createReadStream，有了，将2 GB数据流传输到请求者完全没有问题，最重要的是，进程内存使用率将大致相同。

准备好学习Stream了吗？

本文是我关于Node.js的[Pluralsight课程的一部分内容](https://www.pluralsight.com/courses/nodejs-advanced)。我在那里以视频格式介绍了类似的内容。

## Streams
Node.js中有四种基本流类型：Readable, Writable, Duplex, Transform streams.

 - Readable： 是消费数据的源的一个抽象形式。例（fs.createReadStream）
 - Writable：是数据可以被写入目标的一个抽象形式。例（fs.createWriteStream）
 - Duplex：既是可读的也是可写的。一个例子是 TCP socket。
 - Transform：是基于Duplex流的，用于在写入或读取数据的时候修改或转换数据。例：zlib.createGzip（stream使用gzip来压缩数据）。您可以将转换流视为函数，其中输入是可写流部分，输出是可读流部分。你可能还会听到过transform stream被称作through stream
 
所有流都是EventEmitter的实例。它们可以发出用于读取和写入数据的抽象。但是我们可以consume streams data通过更简单的方法pipe。

## 管道法
下面这行代码是您需要记住的：

```javascript
readableSrc.pipe(writableDest)
```
In this simple line, we're piping the output of a readable stream — the source of data, as the input of a writable stream — the destination.The source has to be a readable stream and the destination has to be a writable one.当然，它们也都可以是duplex/transform streams。In fact, if we're piping into a duplex stream, we can chain pipe calls just like we do in Linux:

```javascript
readableSrc
  .pipe(transformStream1)
  .pipe(transformStream2)
  .pipe(finalWrtitableDest)
```
The method returns the destination stream, which enabled us to do the chaining above.
For streams a (readable), b and c (duplex), and d (writable), we can:

```javascript
a.pipe(b).pipe(c).pipe(d)

# Which is equivalent to:
a.pipe(b)
b.pipe(c)
c.pipe(d)

# Which, in Linux, is equivalent to:
$ a | b | c | d
```
这个方法是最简单的方式去consume streams.通常建议使用pipe方法或者events，但是要避免混合使用两者，一般情况下，在你使用pipe method的时候，你不应该去使用events，但是如果你以自定义的方式去consume the streams，events不失为一种方式。

## Stream events
除了读取数据从readable stream source和写入数据到writable destination。pipe method 还可以自动管理一些事情。例如：错误处理、文件结束、以及一个流比另一个流慢或块的问题。

然而，stream可以直接和events一起使用。下面是一个pipe method读写数据的等效代码：

```javascript
# readable.pipe(writable)

readable.on('data', (chunk) => {
  writable.write(chunk);
});

readable.on('end', () => {
  writable.end();
});
```
下面是一些重要的events和functions，拥有着readable streams 或 writable streams
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210124133904906.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
events和functions是有关联的，因为它们经常一起使用

readable stream上最重要的events是
 - data event：每当流将大量数据传递给使用者时发出的事件
 - end event：当没有更多数据要从流中使用时发出的事件

writable stream上最重要的events是
 - drain event：这是在该可写流可以接收更多的数据的信号。
 - finish event：当所有数据都刷新到underlying system，将发出此事件。


## Readable Streams的暂停和流动模式
Readable streams有两个主要的模型来影响我们consume它们的方式
 - paused mode
 - flowing mode

这两种模型有时候也被称作pull或push modes

默认情况下，所有Readable streams以paused模式启动，但可以轻松将其切换为flowing模式，并在需要的时候返回paused模式。有时，切换会自动发生。

 当readable stream处于paused模式时，我们可以按需从流中读取数据，然而，对于处于flowing模块的readable stream，数据会持续流动，我们不得不去监听事件来consume它。
 
 在flowing mode，如果没有使用者可以处理数据，则实际上可能会丢失数据。这就是为什么当我们flowing模式下使用readable stream时，需要一个data事件处理程序。实际上，仅添加data事件处理程序会将paused stream切换成flowing模式，而删除data事件处理程序将会切换成paused mode.这样做是为了与较旧的Node stream接口向后兼容。

如果需要手动在这两种流模式之间进行切换，可以使用resume() 和 pause() 方法。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210124145751406.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
当使用pipe方法来consuming readable streams时，我们不必担心这些模式，因为pipe会自动将它们进行管理。


## Implementing Streams
当我们谈论Node.js中的流时，有两个主要的不同任务：
 - implementing the streams
 - consuming the streams

到目前位置我们一直在讨论consuming streams, Let’s implement some!
Stream implementers通常需要导入stream模块

## Implementing a Writable Stream
为了实现writable stream，我们需要使用stream模块中的构造函数

```javascript
const { Writable } = require('stream');
```
我们可以以多种方式来实现writable stream，例如：继承Writable 构造函数

```javascript
class myWritableStream extends Writable {
}
```
然而，我更喜欢用简单的构造函数，只需new 一个writable对象，并实现里面的write方法

```javascript
const { Writable } = require('stream');

const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});

process.stdin.pipe(outStream);
```
此write方法带有三个参数。
 - chuck通常是一个缓冲区，除非我们配置不同的数据流
 - encoding通常可以忽略他
 - callback是当我们完成处理data chuck之后调用的。这是写操作是否成功的信号。要发出失败信号，请使用错误对象调用回调。

在outStream，我们简单的使用`console.log(chunk.toString());`作为回调，在没有出现错误的时候。这是一个非常简单且可能不太有用的回声流。它将回显收到的任何内容。

要consume这个stream，我们可以将它和process.stdin（键盘输入到缓冲区）一起使用，这是一个readable stream，因此我们可以通过管道process.stdin将其传输到outStream。

当我们运行上面的代码时，输入到process.stdin的任何内容都将通过outStream console.log行进行回显。

这不是一个非常有用的实现流，因为它实际上已经实现并且是内置的。这非常等同于process.stdout。我们可以将其stdin插入，stdout并通过以下这一行获得完全相同的回声功能：

```javascript
process.stdin.pipe(process.stdout);
```

## Implement a Readable Stream
为了实现readable stream，我们需要一个Readable 接口，并从中构造一个对象，并且实现read()方法。

```javascript
const { Readable } = require('stream');

const inStream = new Readable({
  read() {}
});
```
这是实现readable streams的一种简单方式。我们可以直接push我们希望消费者使用的数据

```javascript
const { Readable } = require('stream'); 

const inStream = new Readable({
  read() {}
});

inStream.push('ABCDEFGHIJKLM');
inStream.push('NOPQRSTUVWXYZ');

inStream.push(null); // No more data

inStream.pipe(process.stdout);
```
当我们push进去null对象的时候，这意味着通知该流没有将要输入的数据了。

为了使用这个简单的readable stream，我们可以通过pipe将其和writable stream（process.stdout.
）连通。

当我们运行上面的代码时，我们将从inStream中读取所有数据并将其回显到标准中。很简单，但是不是很有效率。

我们基本上是将所有数据push到流中在和process.stdout连通之前。更好的方式是按需去推送数据，就是当消费者请求数据的时候再去推送。我们可以在read方法中配置对象来做到这一点

```javascript
const inStream = new Readable({
  read(size) {
    // there is a demand on the data... Someone wants to read it.
  }
});
```
当在eadable stream调用read方法时。实现可以将部分数据推送到队列。例如，我们可以一次推送一个字母，从字符代码65（代表A）开始，并在每次推送时递增：

```javascript
const inStream = new Readable({
  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});

inStream.currentCharCode = 65;
inStream.pipe(process.stdout);
```

当消费者读取readable stream时，该read方法将会持续触发，我们将一直推送字母。我们需要在某个地方停止循环，这就是为什么当currentCharCode大于90（代表Z）时，如果if语句将null推入的原因。

该代码等效于我们开始使用的简单代码，但现在我们在消费者要求时按需推送数据。您应该始终这样做。

## Implementing Duplex/Transform Streams
使用Duplex流，我们可以在一个对象上实现可读流和可写流。就像我们从这两个接口继承一样

这是一个duplex示例，实现了write和read方法
```javascript
const { Duplex } = require('stream');
const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});

inoutStream.currentCharCode = 65;

process.stdin.pipe(inoutStream).pipe(process.stdout);
```
通过组合使用这两个方法，我们可以使用duplex流从A到Z读取字母，也可以使用它用于回显。

最重要的是理解duplex的可读和可写完全可以独立的运行。这仅仅是将两个特征组合成一个对象。

duplex流中更有趣的是transform流，因为其输出是根据输入计算的（类似于一个函数）。

对于transform流，我们不必实现read或write方法，只要实现transform方法即可，因为这个方法整合了read和write方法。

下面的是一个简单的转换流，它将输入的数据转换为大写格式后进行输出

```javascript
const { Transform } = require('stream');

const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(upperCaseTr).pipe(process.stdout);
```
与前面的previous示例完全一样，在此转换流中，
我们仅实现了一个transform()方法。在该方法中，我们将转换chunk为大写版本，然后push将该版本转换为可读部分。

## 流对象模式
默认情况下，流需要Buffer/String值。objectMode我们可以设置一个标志，使流接受任何JavaScript对象。

这是一个简单的例子来证明这一点。以下transform streams可以将逗号分隔的值以字符串映射到JavaScript对象。如此“a,b,c,d”成为{a: b, c: d}。

```javascript
const { Transform } = require('stream');

const commaSplitter = new Transform({
  readableObjectMode: true,
  
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().trim().split(','));
    callback();
  }
});

const arrayToObject = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  
  transform(chunk, encoding, callback) {
    const obj = {};
    for(let i=0; i < chunk.length; i+=2) {
      obj[chunk[i]] = chunk[i+1];
    }
    this.push(obj);
    callback();
  }
});

const objectToString = new Transform({
  writableObjectMode: true,
  
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + '\n');
    callback();
  }
});

process.stdin
  .pipe(commaSplitter)
  .pipe(arrayToObject)
  .pipe(objectToString)
  .pipe(process.stdout)
```

我们传递输入字符串（例如“a,b,c,d”），通过commaSplitter将该字符串转化为可读的数组（[“a”, “b”, “c”, “d”]）。必须添加readableObjectMode属性，因为我们要在其中推送一个对象，而不是字符串。

然后，我们将数组放入管道中arrayToObject流。我们需要一个writableObjectMode属性来使该流接受一个对象。它还将推送一个对象（将输入数组映射到一个对象中），这就是为什么我们添加readableObjectMode属性原因。

最后一个objectToString流接受一个对象，但推出一个字符串，这就是为什么我们添加writableObjectMode属性的原因。

也就是说，如果chuck是对象，就添加`writableObjectMode: true`，如果push里面的是对象，就添加`readableObjectMode: true`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210124163409727.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
## Node的内置transform streams
Node有一些非常有用的内置transform streams。即zlib和crypto流。

这是一个使用zlib.createGzip()流与fs可读/可写流结合来创建文件压缩脚本的示例：
```javascript
const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(file + '.gz'));
```

您可以使用此脚本对作为参数传递的任何文件进行gzip压缩。我们正在将该文件的可读流传递到zlib内置转换流中，然后传递给新gzip压缩文件的可写流。简单。

使用管道的好处是，我们可以根据需要将它们与事件实际结合。举例来说，我希望用户在脚本运行时看到进度指示器，并在脚本完成时看到“完成”消息。由于该pipe方法返回目标流，因此我们还可以链接事件处理程序的注册：

```javascript
const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .on('data', () => process.stdout.write('.'))
  .pipe(fs.createWriteStream(file + '.zz'))
  .on('finish', () => console.log('Done'));
```

因此，使用该pipe方法，我们可以轻松使用流，但仍可以根据需要使用事件进一步定制与这些流的交互。

使用pipe方法的优点在于，我们可以使用它以一种易于阅读的方式来逐段编写程序。 例如, 我们无需监听上面的data事件，而只需创建一个transform流来报告进度，然后将该.on()调用替换为另一个.pipe()调用：

```javascript
const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

const { Transform } = require('stream');

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
  }
});

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + '.zz'))
  .on('finish', () => console.log('Done'));
```
该reportProgress流是简单的passthrough stream，但是它也报告进度以进行标准化。请注意，我使用callback函数里面的第二个参数将数据推入transform()方法内部的。这等效于先推送数据。

合并流的应用是无止境的。例如，如果我们需要在gzip压缩之前或之后对文件进行加密，那么我们所需要做的就是按照我们所需的确切顺序传递另一个转换流。我们可以crypto为此使用Node的模块：

```javascript
const crypto = require('crypto');
// ...

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipher('aes192', 'a_secret'))
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + '.zz'))
  .on('finish', () => console.log('Done'));
```


上面的脚本先压缩然后加密传递的文件，只有拥有机密的人才能使用输出的文件。我们无法使用常规的解压缩工具对该文件进行解压缩，因为该文件已加密。

为了真正能够解压缩上面脚本中压缩的任何内容，我们需要以相反的顺序将相反的流用于crypto和zlib，这很简单：

```javascript
fs.createReadStream(file)
  .pipe(crypto.createDecipher('aes192', 'a_secret'))
  .pipe(zlib.createGunzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file.slice(0, -3)))
  .on('finish', () => console.log('Done'));
```

假设传递的文件是压缩版本，则上面的代码将创建一个读取流，将其createDecipher()通过管道createGunzip()传送到加密流中（使用相同的秘密），将其输出传送到zlib流中，然后将内容写回到没有扩展名部分的文件。