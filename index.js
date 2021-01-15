const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
//const cors = require('cors');
//const request = require('requset');

const api = require('./api');

const app = new Koa();
const router = new Router();
//app.use(cors());
//라우터 설정


//라우터 적용전에 bodyparser 적용
app.use(bodyParser());

// 메인라우터 /api 로 설정
router.use('/api',api.routes()); //api 라우트 적용



app.use(router.routes()).use(router.allowedMethods());

app.listen(4000,()=>{
    console.log('서버열기 성공');
})