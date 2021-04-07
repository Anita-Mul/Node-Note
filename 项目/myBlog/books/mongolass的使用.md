# API 类似于 [node-mongodb-native](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html)

# exec() 
 - 我感觉它的意思就是对数据操作完啦意思
```js
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect('mongodb://localhost:27017/test')// const mongolass = new Mongolass('mongodb://localhost:27017/test')

const User = mongolass.model('User')

User
  .find()
  .select({ name: 1, age: 1 })
  .sort({ name: -1 })
  .exec()
  .then(console.log)
  .catch(console.error)
```

# Types
 - string
 - number
 - boolean
 - Mongolass.Types.ObjectId
 - Mongolass.Types.String
 - Mongolass.Types.Number
 - Mongolass.Types.Date
 - Mongolass.Types.Buffer
 - Mongolass.Types.Boolean
 - Mongolass.Types.Mixed
number 和 Mongolass.Types.Number之间的区别是：
number只检查类型
Mongolass.Types.Number 将会将这个值转换为number，如果失败将会抛出错误


# Plugins
> mongolass.plugin(pluginName, hooks)// register global plugin
User.plugin(pluginName, hooks)// register model plugin

### `example`
```js
const moment = require('moment')
const Mongolass = require('mongolass')
const mongolass = new Mongolass('mongodb://localhost:27017/test')
const User = mongolass.model('User')

// 全局插件
// 第一个参数是插件的名字
mongolass.plugin('addCreatedAt', {
  // before、after是执行这个操作前还是后
  beforeInsert: function (format) {
    // this._op 是这个操作的名字
    // this._args 是这个操作中的数据
    // format 是里面的参数
    console.log('beforeInsert', this._op, this._args, format)
    // await User.insert({ firstname: 'san', lastname: 'zhang' }).addCreatedAt('YYYY-MM-DD')
    // beforeInsert insert [ { firstname: 'san', lastname: 'zhang' } ] YYYY-MM-DD

    // 在执行插入操作之前往要插入的对象中添加一个createdAt属性
    this._args[0].createdAt = moment().format(format)
  }
})

User.plugin('addFullname', {
  // user是在FindOne之后找到的对象
  afterFindOne: function (user, opt) {
    console.log('afterFindOne', this._op, this._args, opt)
    // afterFindOne findOne [] { sep: '-' }
    if (!user) return user
    user.fullname = user.firstname + opt.sep + user.lastname
    return user
  },
  afterFind: async function (users, opt) {
    console.log('afterFind', this._op, this._args, opt)
    // afterFind find [ { firstname: 'san' } ] { sep: ' ' }
    if (!users.length) return users
    return users.map(user => {
      user.fullname = user.firstname + opt.sep + user.lastname
      return user
    })
  }
})

;(async function () {
  // when use await, .exec() is omissible.
  await User.insert({ firstname: 'san', lastname: 'zhang' }).addCreatedAt('YYYY-MM-DD')
  console.log(await User.findOne().addFullname({ sep: '-' }))
  // { _id: 5850186544c3b82d23a82e45,
  //   firstname: 'san',
  //   lastname: 'zhang',
  //   createdAt: '2016-12-13',
  //   fullname: 'san-zhang' }
  console.log(await User.find({ firstname: 'san' }).addFullname({ sep: ' ' }))
  // [ { _id: 5850186544c3b82d23a82e45,
  //     firstname: 'san',
  //     lastname: 'zhang',
  //     createdAt: '2016-12-13',
  //     fullname: 'san zhang' } ]
})().catch(console.error)
```

### 插件使用顺序的不同将会带来不同的结果
```js
const Mongolass = require('mongolass')
const mongolass = new Mongolass('mongodb://localhost:27017/test')
const User = mongolass.model('User')

User.plugin('add2', {
  afterFindOne: function (user) {
    if (!user) return user
    user.name = `${user.name}2`
    return user
  }
})
User.plugin('add3', {
  afterFindOne: async function (user) {
    if (!user) return user
    user.name = `${user.name}3`
    return user
  }
})

;(async function () {
  await User.insert({ name: '1' })
  console.log(await User.findOne().add2().add3())
  // { _id: 58501a8a7cc264af259ca691, name: '123' }
  console.log(await User.findOne().add3().add2())
  // { _id: 58501a8a7cc264af259ca691, name: '132' }
})().catch(console.error)
```
## Built-in plugins
 - [limit](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [sort](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [projection(alias: select)](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [fields(alias: select)](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [skip](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [hint](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [populate](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [explain](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [snapshot](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [timeout](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [tailable](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [batchSize](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [returnKey](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [maxScan](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [min](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [max](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [showDiskLoc](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [comment](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [raw](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [promoteLongs](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [promoteValues](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [promoteBuffers](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [readPreference](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [partial](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [maxTimeMS](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [collation](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
 - [session](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)
  
#### example
```js
const Mongolass = require('mongolass')
const mongolass = new Mongolass('mongodb://localhost:27017/test')
const User = mongolass.model('User')

;(async function () {
  await User.insert({ name: '1' })
  await User.insert({ name: '2' })
  const result = await User
    .find()
    .skip(1)
    .limit(1)
  console.log(result)
  // [ { _id: 58501c1281ea915a2760a2ee, name: '2' } ]
})().catch(console.error)
```
