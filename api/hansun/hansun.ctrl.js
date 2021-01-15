const sql = require('mssql');
//const request = require('koa-requset');

const config = {  
    user: 'sa',
    password: 'Admin6973',
    server: '221.161.62.124',
    database: 'Han_Eng_Back',
    port: 2433, 
    options : {
        enableArithAbort: true,
        encrypt: false
    }
};
let table = {};
let hobby = {};
;

/* 목록조회 */
const avghobby = async function () {
    console.log("hobby 시작")
    try{
        let pool = await sql.connect(config)
        console.log("디비연결성공")
        let result1 = await pool.request().query('select hobby , count(*) as 취미갯수 from kms group by hobby')
        // console.log(result1.recordset)
        hobby = result1.recordset;
       // console.log('ㅁㅁ:',table);
    } catch(err){
        console.log(err);
    }
}


/* 목록조회 */
const getList = async function () {
    console.log("List 시작")
    try{
        let pool = await sql.connect(config)
        console.log("디비연결성공")
        let result1 = await pool.request().query('select * from kms order by number asc')
        // console.log(result1.recordset)
        table = result1.recordset;
       // console.log('ㅁㅁ:',table);
    } catch(err){
        console.log(err);
    }
}

/* 작성 */
const getWrite =async function (ctx) { //request 나 response의 정보를 담고있음
    console.log('Write 시작')
    
    try{
        let pool = await sql.connect(config)
         console.log('디비연결 성공')
         console.log('바디정보',ctx.request.body.data)
         await pool.request()
        .input('stuid', ctx.request.body.data.stuid)
        .input('name',ctx.request.body.data.name)
        .input('phone',ctx.request.body.data.phone)
        .input('age',ctx.request.body.data.age)
        .input('hobby',ctx.request.body.data.hobby)
        .input('job',ctx.request.body.data.job)
        .input('email',ctx.request.body.data.email)
        .input('address',ctx.request.body.data.address)
        .query('insert into kms values (@stuid, @name, @phone, @age, @hobby, @job, @email, @address)')
        console.log("여기까지 들옴")
    } catch(err){
        console.log(err);
    }
}
/* 특정 데이터 삭제 */
const getRemove = async function (ctx) {
    console.log("Delete 시작")

    try{
        console.log('넘어온 값',ctx.request.body);
        let pool = await sql.connect(config)
        console.log("디비연결성공")
        await pool.request().input('number',ctx.request.body.number).query('delete from kms where number = @number')
        console.log("요기 왓나?")
    } catch(err){
        console.log(err);
    }
}

/* 특정 데이터 수정 */
const getUpdate = async function (ctx) {
    console.log("Update 시작")

    try{
        console.log("넘어온 값",ctx.request.body.data);
        let pool = await sql.connect(config)
        console.log("디비연결성공")
        await pool.request().input('number',ctx.request.body.data.number)
        .input('stuid', ctx.request.body.data.stuid)
        .input('name',ctx.request.body.data.name)
        .input('phone',ctx.request.body.data.phone)
        .input('age',ctx.request.body.data.age)
        .input('hobby',ctx.request.body.data.hobby)
        .input('job',ctx.request.body.data.job)
        .input('email',ctx.request.body.data.email)
        .input('address',ctx.request.body.data.address)
        .query('update kms set stuid=@stuid ,name=@name ,phone=@phone ,age=@age ,hobby=@hobby ,job=@job ,email=@email ,address=@address  where number = @number')
        console.log("요기 왓나?")
    } catch(err){
        console.log(err);
    }
}


//전체 조회 list로 빼서 꺼낸 테이블을 바디에 넣는다
exports.list = ctx => {
    getList();
    ctx.body = table;
    //console.log(table);
};

exports.write = ctx => {
    console.log('함수실행')
    getWrite(ctx);
    //ctx.body = table;
};

exports.remove = ctx => {
    console.log('함수실행')
    getRemove(ctx);
    //ctx.body = table;
};

exports.update = ctx => {
    console.log('함수실행')
    getUpdate(ctx);
    //ctx.body = table;
};

exports.aaa = ctx => {
    avghobby();
    ctx.body = hobby;
    //console.log(table);
};