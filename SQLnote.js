/*
    *DataType:
        1.int 整数
        2.varchar(len) 字符串
        3.tinyint(1) 布尔值
    *字段的特殊标识：
        1. PK (Primary Key) 主键，唯一标识。
        2. NN (Not Null) 值不允许为空。
        3. UQ (Unique) 值唯一，不能出现两个值重复的数据。
        4. AI (Auto Increment) 值自动增长。
    
    *SQL
        select, insert into, update, delete
        where, and or, order by, count(*)

    -- select * from users 
    -- select username, password from users
    -- insert into users (username, password) values ('Tony Stark', 098123)
    -- update users set password = '888888' where id = 4
    -- update users set password ='admin123', status = 1 where id = 2  切记加 where 否则全部数据都会改。
    -- delete from users where id = 4 切记加 where 否则全部数据会删除。
    -- select * from users where username <> 'admin'
    -- select * from users where id < 3 and status = 0
    -- select * from users where username = 'Tom' or status = 1
    -- select * from users order by id (ASC) ASC代表升序排序也就是默认的排序，可写可不写。
    -- select * from users order by id DESC DESC代表降序排序。
    -- select * from users order by status DESC, username ASC
    -- select count(*) from users where status = 0
    -- select count(*) as total from users where status = 0
    -- select username as uname, password as pass from users
*/
