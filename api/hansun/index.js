const Router = require('koa-router');
const hasunCtrl = require('./hansun.ctrl');

const hansuns = new Router();

//만든 컨트롤러 함수들을 라우트에 연결시키기.

 hansuns.get('/',hasunCtrl.list);
 hansuns.get('/aa',hasunCtrl.aaa);
 hansuns.post('/',hasunCtrl.write);
 hansuns.delete('/',hasunCtrl.remove);
 hansuns.put('/',hasunCtrl.update);
//localhost:4000/api/hansun/ 이후로 해서 hasunCtrl.list 이를 호출

module.exports = hansuns;

//hansun에 라우터 생성하고 처리함수는 따로 hansunctrl 로 관리함.