//* 配置数据库

// 1. 导入mysql模块
const mysql = require('mysql')
// 2. 建立于MySOL数据库关系
const db = mysql.createPool({
  host: '127.0.0.1', // 数据库的 ip 地址
  user: 'root', // 数据库的账号
  password: 'admin123', // 登录数据库的密码
  database: 'my_db_01', // 指定要操作的数据库
})
// 3. 测试mysql模块能否正常工作
db.query('select 1', (err, results) => {
  if (err) return console.log(err.message)
  console.log(results) // [ RowDataPacket { '1': 1 } ] 代表能正常工作
})

//* 查询数据
const sqlStr = 'select * from users'
// 如果执行select 查询语句，则执行result结果是数组。
db.query(sqlStr, (err, results) => {
  if (err) return console.log(err.message)
  console.log(results)
})

//* 插入数据：
// 方法1
const newUser = { username: 'Spider-Man', password: 'pcc321' }
const sqlAdd = 'insert into users (username, password) values (?, ?)'
db.query(sqlAdd, [newUser.username, newUser.password], (err, results) => {
  // 如果执行insert into 插入语句，则执行 result 结果是对象， 这个对象包含 affectedRows 属性。
  // 可以根据 affectedRows 属性，来判断是否插入成功。
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('Insert Succeeds!')
  }
})
// 方法2
// 在新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以用快接方式插入。
const newUser1 = { username: 'Spider-Man2', password: 'pcc321' }
const sqlAdd1 = 'insert into users set ?'
db.query(sqlAdd1, newUser1, (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('Insert Succeed!')
})
// 方法3
// 封装后：
// const add1 = ({ username, password }) => {
//   const sqlAdd = 'insert into users (username, password) values (?, ?)'
//   db.query(sqlAdd, [username, password], (err, results) => {
//     if (err) return console.log(err.message)
//     if (results.affectedRows === 1) {
//       console.log('Insert Succeeds!')
//     }
//   })
// }
// add1(newUser) // call 需放在后面，因为箭头函数没有预解析。

//* 更新数据对象
// 方法1
const user = { id: 7, username: 'aaa', password: '000' }
const sqlUpdate = 'update users set username = ?, password = ? where id = ?'
db.query(sqlUpdate, [user.username, user.password, user.id], (err, results) => {
  // 如果执行 update 更新语句，则执行 result 结果是对象， 这个对象包含 affectedRows 属性。
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('Update Succeed!')
})
// 方法2
// 在更新数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以用快接方式更新。
const user1 = { id: 7, username: 'bbb', password: '111' }
const sqlUpdate1 = 'update users set ? where id = ?'
db.query(sqlUpdate1, [user1, user1.id], (err, results) => {
  if (err) console.log(err.me)
  if (results.affectedRows === 1) console.log('Update Succeed!')
})

//* 删除数据对象
// 方法1 (不安全的方法)
const delUserId = 7
const sqlDel = 'delete from users where id = ?'
// 如果执行 delete 删除语句，则执行 result 结果是对象， 这个对象包含 affectedRows 属性。
// 注意：如果 SQL 语句中有多个占位符，则必须使用数组包裹每个占位符具体的值。
//      如果 SQL 语句中只有一个占位符，则可以省略数组来包裹这一个值。
db.query(sqlDel, [delUserId], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('Delete Succeed!')
})
// 方法2  (安全的方法)
// -> 标记删除：使用delete语句，会真正把数据从表中删除掉。未来保险，推荐标记删除，来模拟删除的动作。
// 操作：在表中设置类似于status这样的状态字段，来标记当前这条数据是否被删除。
//      当用户执行删除动作时，我们并没有执行delete语句真正把数据删除掉，而是执行了update语句，把这条数据的status标记为删除即可。
const delUserId1 = 9
const sqlDel1 = 'update users set status = ? where id = ?'
db.query(sqlDel1, [1, delUserId1], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('Delete Succeed!!')
})
