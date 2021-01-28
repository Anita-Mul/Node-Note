## Node.js fsģ��
 - Node.js����ģ��һ����
 - fs.access()������ļ��Ƿ���ڣ�Node.js����ʹ����Ȩ�޷�����
- fs.appendFile()��������׷�ӵ��ļ�������ļ������ڣ��򴴽�
 - fs.chmod()������ͨ�����ݵ��ļ���ָ�����ļ���Ȩ�ޡ�����Ķ���fs.lchmod()��fs.fchmod()
 - fs.chown()�������ɴ��ݵ��ļ���ָ�����ļ��������ߺ��顣����Ķ���fs.fchown()��fs.lchown()
 - fs.close()���ر��ļ�������
 - fs.copyFile()�������ļ�
 - fs.createReadStream()�������ɶ����ļ���
 - fs.createWriteStream()��������д�ļ���
 - fs.link()������ָ���ļ�����Ӳ����
 - fs.mkdir()�� �½�һ���ļ���
 - fs.mkdtemp()������һ����ʱĿ¼
 - fs.open()�������ļ�ģʽ
 - fs.readdir()����ȡĿ¼������
 - fs.readFile()����ȡ�ļ������ݡ��йأ�fs.read()
 - fs.readlink()����ȡ�������ӵ�ֵ
 - fs.realpath()��������ļ�·��ָ�루.��..������Ϊ����·��
 - fs.rename()���������ļ����ļ���
 - fs.rmdir()��ɾ���ļ���
 - fs.stat()�������ɴ��ݵ��ļ�����ʶ���ļ���״̬������Ķ���fs.fstat()��fs.lstat()
 - fs.symlink()������ָ���ļ����·�������
 - fs.truncate()�������ݵ��ļ�����ʶ���ļ��ض�Ϊָ���ĳ��ȡ��йأ�fs.ftruncate()
 - fs.unlink()��ɾ���ļ����������
 - fs.unwatchFile()��ֹͣ�����ļ��ϵĸ���
 - fs.utimes()������ͨ�����ݵ��ļ�����ʶ���ļ���ʱ������йأ�fs.futimes()
 - fs.watchFile()����ʼ�����ļ��ϵĸ��ġ��йأ�fs.watch()
 - fs.writeFile()��������д���ļ����йأ�fs.write()


`Ĭ����������з��������첽�ģ�����ͨ��׷������Ҳ����ͬ������Sync��`
 - fs.rename()
 - fs.renameSync()
 - fs.write()
 - fs.writeSync()

```javascript
����
const fs = require('fs')

fs.rename('before.json', 'after.json', err => {
  if (err) {
    return console.error(err)
  }

  //done
})

//ʹ��ͬ�����ű���ִ�н�������ֱ���ļ������ɹ���
const fs = require('fs')

try {
  fs.renameSync('before.json', 'after.json')
  //done
} catch (err) {
  console.error(err)
}
```

***
 ## ��Node.js��ʹ���ļ�������
 - r+ ���ļ����ж�д
 - w+���ļ��Խ��ж�д�����������ļ��Ŀ�ͷ������������򴴽��ļ�
 - a��Ҫд����ļ������������ļ�ĩβ������������򴴽��ļ�
 - a+���ļ��Խ��ж�д�����������ļ�ĩβ������������򴴽��ļ�

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
## Node.js�ļ�״̬
�ļ���Ϣ������stats������
 - ����ļ���Ŀ¼���ļ�����ʹ��stats.isFile()��stats.isDirectory()
 - ����ļ��Ƿ������ӣ���ʹ�� stats.isSymbolicLink()
 - ʹ�õ��ļ���С�����ֽ�Ϊ��λ��stats.size��

```javascript
const fs = require('fs')
fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }
  //we have access to the file stats in `stats`
})

//Node.js���ṩ��һ��sync�������÷����������̣߳�ֱ���ļ�״̬׼������Ϊֹ��
const fs = require('fs')
try {
  const stats = fs.statSync('/Users/joe/test.txt')
} catch (err) {
  console.error(err)
}

//һЩ�߼�����
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
## Node.js�ļ�·��
 - dirname����ȡ�ļ��ĸ��ļ���
 - basename����ȡ�ļ�������
 - extname����ȡ�ļ���չ��

```javascript
const notes = '/users/joe/notes.txt'

path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt

//��ò�����չ�����ļ���
path.basename(notes, path.extname(notes)) //notes

//����·����������������path.join()
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
//�ܽ᣺�Ӻ���ǰ�����ַ��� / ��ͷ������ƴ�ӵ�ǰ���·�������� ��/ ��ͷ��ƴ��ǰ���·�����Ҳ������һ��·�������������ֶ����/��/�����ߡ�/�������ǰ������·��������ƴ�ӣ����� ./ ��ͷ ����û�з��� ��ƴ��ǰ��·����
```
***
## ʹ��Node.js��ȡ�ļ�
```javascript
const fs = require('fs')

fs.readFile('/Users/joe/test.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})

//ͬ���汾 fs.readFileSync()
//����ζ�Ŵ��ļ����������ڴ����ĺͳ���ִ���ٶȲ����ش�Ӱ�졣
const fs = require('fs')

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
}
```
***
## ��Node.js��д�ļ�
���ܻ�ʹ�õ��ı�־��
 - r+ ���ļ����ж�д
 - w+���ļ��Խ��ж�д�����������ļ��Ŀ�ͷ������������򴴽��ļ�
 - a��Ҫд����ļ������������ļ�ĩβ������������򴴽��ļ�
 - a+���ļ��Խ��ж�д�����������ļ�ĩβ������������򴴽��ļ�
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

// ͬ���汾
const fs = require('fs')

const content = 'Some content!'

try {
  const data = fs.writeFileSync('/Users/joe/test.txt', content)
  //file written successfully
} catch (err) {
  console.error(err)
}

//���ӵ��ļ�
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
## ��Node.js��ʹ���ļ���
```javascript
//����ļ����Ƿ����
fs.access();

//�½�һ���ļ���
// fs.mkdir() �� fs.mkdirSync() ����һ�����ļ���
const fs = require('fs')

const folderName = '/Users/joe/test'

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}

//��ȡĿ¼����
//fs.readdir() �� fs.readdirSync()
//�����ļ�������ļ�����
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

//�����Ի�ȡ����·��
fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName)
})

//���˵��ļ��У�ֻ�����ļ�
const isFile = fileName => {
  return fs.lstatSync(fileName).isFile()
}

fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName)
})
.filter(isFile)

//�������ļ���
//ʹ��fs.rename()��fs.renameSync()
//��һ�������ǵ�ǰ·�����ڶ�����������·��
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
��������������������������������������������������������������������������������
//ɾ���ļ���
//fs.rmdir()��fs.rmdirSync()ɾ���ļ���
//ɾ���ļ������ݱȽϸ��ӣ�����ʹ��fs-extra
//npm install fs-extra
const fs = require('fs-extra')

const folder = '/Users/joe'

fs.remove(folder, err => {
  console.error(err)
})

// ������promisesһ��ʹ��
fs.remove(folder)
  .then(() => {
    //done
  })
  .catch(err => {
    console.error(err)
  })
//��ʹ��async / await
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
