const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// - 模块加载时就建立连接，不管是否需要使用数据库---使用async函数测试连接
// - 连接失败时会导致模块加载失败
// - 没有连接池管理，每次请求都使用同一个连接
// - 连接断开后不会自动重连
// - 没有错误处理机制，连接失败会直接导致应用崩溃

// 连接连接池

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 测试连接
const testConnection = async () => {
    try {
        const connection = await pool.getConnection(); //.getConnection() 方法返回一个 Promise，用于获取连接池中的连接
        console.log('数据库连接池创建成功');
        connection.release(); // 释放连接，返回连接池
        const sql = 'SELECT * FROM user WHERE id = 1'
        const [rows] = await pool.query(sql)
        console.log('测试登录用户信息', rows[0].username, rows[0].email);
        return true;
    } catch (error) {
        console.error('数据库连接失败:', error);
        return false;
    }
};

module.exports = {
    pool,
    testConnection // async函数
};
