## Node.js fs模块
 - Node.js核心模块一部分
 - fs.access()：检查文件是否存在，Node.js可以使用其权限访问它
- fs.appendFile()：将数据追加到文件。如果文件不存在，则创建
 - fs.chmod()：更改通过传递的文件名指定的文件的权限。相关阅读：fs.lchmod()，fs.fchmod()
 - fs.chown()：更改由传递的文件名指定的文件的所有者和组。相关阅读：fs.fchown()，fs.lchown()
 - fs.close()：关闭文件描述符
 - fs.copyFile()：复制文件
 - fs.createReadStream()：创建可读的文件流
 - fs.createWriteStream()：创建可写文件流
 - fs.link()：创建指向文件的新硬链接
 - fs.mkdir()： 新建一个文件夹
 - fs.mkdtemp()：创建一个临时目录
 - fs.open()：设置文件模式
 - fs.readdir()：读取目录的内容
 - fs.readFile()：读取文件的内容。有关：fs.read()
 - fs.readlink()：读取符号链接的值
 - fs.realpath()：将相对文件路径指针（.，..）解析为完整路径
 - fs.rename()：重命名文件或文件夹
 - fs.rmdir()：删除文件夹
 - fs.stat()：返回由传递的文件名标识的文件的状态。相关阅读：fs.fstat()，fs.lstat()
 - fs.symlink()：创建指向文件的新符号链接
 - fs.truncate()：将传递的文件名标识的文件截断为指定的长度。有关：fs.ftruncate()
 - fs.unlink()：删除文件或符号链接
 - fs.unwatchFile()：停止监视文件上的更改
 - fs.utimes()：更改通过传递的文件名标识的文件的时间戳。有关：fs.futimes()
 - fs.watchFile()：开始监视文件上的更改。有关：fs.watch()
 - fs.writeFile()：将数据写入文件。有关：fs.write()


`默认情况下所有方法都是异步的，但是通过追加它们也可以同步工作Sync。`
 - fs.rename()
 - fs.renameSync()
 - fs.write()
 - fs.writeSync()

```javascript
例：
const fs = require('fs')

fs.rename('before.json', 'after.json', err => {
  if (err) {
    return console.error(err)
  }

  //done
})

//使用同步，脚本的执行将阻塞，直到文件操作成功。
const fs = require('fs')

try {
  fs.renameSync('before.json', 'after.json')
  //done
} catch (err) {
  console.error(err)
}
```

***
 ## 在Node.js中使用文件描述符
 - r+ 打开文件进行读写
 - w+打开文件以进行读写，将流放在文件的开头。如果不存在则创建文件
 - a打开要写入的文件，将流放在文件末尾。如果不存在则创建文件
 - a+打开文件以进行读写，将流放在文件末尾。如果不存在则创建文件

```javascript
const fs = require('fs')

fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  //fd is our file descriptor
})
```
```javascript
const fs = require('fs')

try {
  const fd = fs.openSync('/Users/joe/test.txt', 'r')
} catch (err) {
  console.error(err)
}
```
***
## Node.js文件状态
文件信息包含在stats变量中
 - 如果文件是目录或文件，请使用stats.isFile()和stats.isDirectory()
 - 如果文件是符号链接，则使用 stats.isSymbolicLink()
 - 使用的文件大小（以字节为单位）stats.size。

```javascript
const fs = require('fs')
fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }
  //we have access to the file stats in `stats`
})

//Node.js还提供了一个sync方法，该方法将阻塞线程，直到文件状态准备就绪为止：
const fs = require('fs')
try {
  const stats = fs.statSync('/Users/joe/test.txt')
} catch (err) {
  console.error(err)
}

//一些高级方法
const fs = require('fs')
fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  stats.isFile() //true
  stats.isDirectory() //false
  stats.isSymbolicLink() //false
  stats.size //1024000 //= 1MB
})
```
***
## Node.js文件路径
 - dirname：获取文件的父文件夹
 - basename：获取文件名部分
 - extname：获取文件扩展名

```javascript
const notes = '/users/joe/notes.txt'

path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt

//获得不带扩展名的文件名
path.basename(notes, path.extname(notes)) //notes

//连接路径的两个或多个部分path.join()
const name = 'joe'
path.join('/', 'users', name, 'notes.txt') //'/users/joe/notes.txt'

path.resolve('/foo/bar', './baz')   // returns '/foo/bar/baz'
path.resolve('/foo/bar', 'baz')   // returns '/foo/bar/baz'
path.resolve('/foo/bar', '/baz')   // returns '/baz'
path.resolve('/foo/bar', '../baz')   // returns '/foo/baz'
path.resolve('home','/foo/bar', '../baz')   // returns '/foo/baz'
path.resolve('home','./foo/bar', '../baz')   // returns '/home/foo/baz'
path.resolve('home','foo/bar', '../baz')   // returns '/home/foo/baz'
path.resolve('home', 'foo', 'build','aaaa','aadada','../../..', 'asset') //return '/home/foo/asset'
//总结：从后向前，若字符以 / 开头，不会拼接到前面的路径；若以 …/ 开头，拼接前面的路径，且不含最后一节路径；若连续出现多个…/…/…或者…/…则忽略前方…个路径名进行拼接；若以 ./ 开头 或者没有符号 则拼接前面路径；
```
***
## 使用Node.js读取文件
```javascript
const fs = require('fs')

fs.readFile('/Users/joe/test.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})

//同步版本 fs.readFileSync()
//这意味着大文件将对您的内存消耗和程序执行速度产生重大影响。
const fs = require('fs')

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
}
```
***
## 用Node.js编写文件
可能会使用到的标志：
 - r+ 打开文件进行读写
 - w+打开文件以进行读写，将流放在文件的开头。如果不存在则创建文件
 - a打开要写入的文件，将流放在文件末尾。如果不存在则创建文件
 - a+打开文件以进行读写，将流放在文件末尾。如果不存在则创建文件
```javascript
const fs = require('fs')

const content = 'Some content!'

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})

// 同步版本
const fs = require('fs')

const content = 'Some content!'

try {
  const data = fs.writeFileSync('/Users/joe/test.txt', content)
  //file written successfully
} catch (err) {
  console.error(err)
}

//附加到文件
const content = 'Some content!'

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //done!
})
```
***
## 在Node.js中使用文件夹
```javascript
//检查文件夹是否存在
fs.access();

//新建一个文件夹
// fs.mkdir() 或 fs.mkdirSync() 创建一个新文件夹
const fs = require('fs')

const folderName = '/Users/joe/test'

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}

//读取目录内容
//fs.readdir() 或 fs.readdirSync()
//返回文件夹里的文件名字
const fs = require('fs')
const path = require('path')
const folderPath = '/Users/joe'
fs.readdirSync(folderPath)
/*
[ 'app.js',
  'node_modules',
  'package-lock.json',
  'package.json',
  'req.js',
  'test.js',
  'yarn.lock' ]
*/

//您可以获取完整路径
fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName)
})

//过滤掉文件夹，只返回文件
const isFile = fileName => {
  return fs.lstatSync(fileName).isFile()
}

fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName)
})
.filter(isFile)

//重命名文件夹
//使用fs.rename()或fs.renameSync()
//第一个参数是当前路径，第二个参数是新路径
const fs = require('fs')

fs.rename('/Users/joe', '/Users/roger', err => {
  if (err) {
    console.error(err)
    return
  }
  //done
})

try {
  fs.renameSync('/Users/joe', '/Users/roger')
} catch (err) {
  console.error(err)
}
————————————————————————————————————————
//删除文件夹
//fs.rmdir()或fs.rmdirSync()删除文件夹
//删除文件夹内容比较复杂，可以使用fs-extra
//npm install fs-extra
const fs = require('fs-extra')

const folder = '/Users/joe'

fs.remove(folder, err => {
  console.error(err)
})

// 可以与promises一起使用
fs.remove(folder)
  .then(() => {
    //done
  })
  .catch(err => {
    console.error(err)
  })
//或使用async / await
async function removeFolder(folder) {
  try {
    await fs.remove(folder)
    //done
  } catch (err) {
    console.error(err)
  }
}

const folder = '/Users/joe'
removeFolder(folder)

```
