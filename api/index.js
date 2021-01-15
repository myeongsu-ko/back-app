const Router = require('koa-router');
const hansuns = require('./hansun');

const api = new Router();

api.use('/hansun',hansuns.routes());


module.exports = api;


//라우트 모듈화 진행