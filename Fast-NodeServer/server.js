const express = require('express');
const { testConnection } = require('./utils/connect_db');
const cors = require('cors');
const dotenv = require('dotenv');


// 要防止异常导致服务器崩溃

dotenv.config();
const app = express();
// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes/login_request'))
app.use(require('./routes/register_request'))
app.use(require('./routes/article_request'))
app.use(require('./routes/article_category_request'))
app.use(require('./routes/user_request'))
app.use(require('./routes/hunyuan_request'))
app.use(require('./routes/role_request'))
app.use(require('./routes/permission_request'))

//  确保启用 CORS
app.use(cors({
  origin: ['http://localhost:*', 'http://127.0.0.1:*']
}));

// 启动服务器
async function startServer() {
  // 测试连接
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('数据库连接失败');
    process.exit(1);
  }
  const PORT = process.env.PORT || 7000;
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
  });
}
// 启动服务器
startServer();
