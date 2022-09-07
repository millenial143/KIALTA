const { TRUE } = require('node-sass');
const io = require('socket.io')();
const {Client} = require('pg');

let roomIdCounter = 0;
let rooms=[];
let users=[];

io.listen(8000);
console.log('Сервер запущен. Порт: ', 8000);

//var connectionString = "postgres://postgres:vova2211@localhost/ip:5432/kialta";
//var pgClient = new pg.Client(connectionString);
const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'kialta',
    password: 'vova2211',
    port: 5432  
});
db.connect();

function idchecker() {
    db.query("SELECT * FROM user_passwords WHERE user_login=$1 AND user_password=$2",[login,pass],function (err,ret) {
        if (err) {
          console.error('ЕБАТЬ КАКАЯ ТО ОШИБКА', err);
        }
        else {
            let maxnumb = 0;
            for (let i = 0; i < ret.rowCount; i++){
                if (ret.rows[i].id > maxnumb) maxnumb = ret.rows[i].id;
            }
            return maxnumb+1;
        }
    });
}

// let mysqlbase = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "usersdb",
//     password: "пароль_от_сервера"
// });

function FindMe(mysock) {
    let numb = null;
    for(let i = 0; i < users.length; i++) {
        if (users[i].sock == mysock) {
            numb = users[i];
        }
    }
    return numb;
}

function DeleteMe(mysock) {
    let numb = null;
    for(let i = 0; i < users.length; i++) {
        if (users[i].sock == mysock) {
            users.splice(i,1);
            i--
        }
    }
}

function SetMe(mysock,info) {
    let numb = null;
    for(let i = 0; i < users.length; i++) {
        if (users[i].sock == mysock) {
            users[i] = info;
        }
    }
}

function FindRoom(roomsock) {
    let numb = null;
    for(let i = 0; i < rooms.length; i++) {
        if (rooms[i].id == roomsock) {
            numb = rooms[i];
        }
    }
    return numb;
}

function FindRoomSock(sock) {
    let numb = null;
    for(let i = 0; i < rooms.length; i++) {
        if (rooms[i].userSock == sock) {
            numb = rooms[i];
        }
    }
    return numb;
}

function FindRoomSockUr(sock) {
    let numb = null;
    for(let i = 0; i < rooms.length; i++) {
        if (rooms[i].lawsocks == sock) {
            numb = rooms[i];
        }
    }
    return numb;
}

function DeleteRoomSock(sock) {
    let numb = null;
    for(let i = 0; i < rooms.length; i++) {
        if (rooms[i].userSock == sock) {
            rooms.splice(i,1);
        }
    }
    return numb;
}

function DeleteRoomSockUr(sock) {
    let numb = null;
    for(let i = 0; i < rooms.length; i++) {
        if (rooms[i].lawsocks == sock) {
            rooms.splice(i,1);
        }
    }
    return numb;
}

function SetRoom(roomsock,info) {
    let numb = null;
    for(let i = 0; i < rooms.length; i++) {
        if (rooms[i].id == roomsock) {
            rooms[i] = info;
        }
    }
}

function CountUr() {
    let numb = 0;
    for(let i = 0; i < users.length; i++) {
        if (users[i].permission === 1) {
            numb++;
        }
    }
    return numb;
}

io.on('connection', function(socket) {
    console.log('Подключён новый пользователь');
    users.push({
        userName: 'Клиент (Неопознан)',
        sock: socket,
        permission: 0,
        urid: null,
        fio: null,
        avatar: null,
        desc: null,
        education: null,
        staj: null,
        sessiontime: 0
    });
    let newinfo = FindMe(socket);
    socket.emit('refme', newinfo.userName, newinfo.permission,newinfo.urid,newinfo.fio,newinfo.avatar,newinfo.desc,newinfo.education,newinfo.staj,newinfo.sessiontime);


    socket.on('needporn',function(userName,consultTheme){
        socket.emit('layeraddclear');
        console.log('Запрос на отчистку ФУРРИ');
        db.query('SELECT * FROM user_info WHERE perm=1',[],function (err,sqlinfo) {
            if (err) {
            console.error('ЕБАТЬ КАКАЯ ТО ОШИБКА', err);
            }
            else {
                for (let i = 0; i < sqlinfo.rowCount; i++) {
                    
                    socket.emit('layeradd',sqlinfo.rows[i].fio,sqlinfo.rows[i].description,sqlinfo.rows[i].prof_img,sqlinfo.rows[i].benches,sqlinfo.rows[i].exp);
                    console.log('Добавляю новую фурри',sqlinfo.rows[i].fio,sqlinfo.rows[i].description,sqlinfo.rows[i].prof_img,sqlinfo.rows[i].benches,sqlinfo.rows[i].exp);
                }
            }
        });
        
        socket.emit('layeraddstop');
        console.log('Запрос на подгрузку фурри');
    });
    /* Получает клиент
    roomlist (Комнаты) - Отправка комнат
    errorjoin (Причина) - Ошибка входа/создания комнаты
    successjoin (id комнаты) - Комната создана и вход в неё реализован
    successlogin (ФИО,Аватарка,Описание,Стаж,Аттестаты,Право (Нужно для прогрузки страницы админа)) - Успешная авторизация юриста и отправка данных ему
    successroom (Данные комнаты) - Успешный вход
    kickur (Причина) - Выход/Выкидывание юриста
    msgtocnt (Сообщение) - Отправка сообщения пользователя
    */


    /* Получает сервер
    createroom (Имя, Тема) - Создание комнаты клиента
    loginur (Логин, Пароль) - Авторизация юриста
    roomjoin (ID комнаты) - Присоединение юриста к комнате
    exitroom () - Выход из комнаты
    msgtosrv (Сообщение) - Получение сообщения на сервер
    */

    // Создание комнаты на кнопку войти
    socket.on('createroom',function(userName,consultTheme){
        console.log('Пользователь пытается создать комнату');
        if (userName != null) {
            if (CountUr() > 0) {
                let mynumb = FindMe(socket);
                if (mynumb != null) {
                    mynumb.userName = userName;
                    SetMe(socket,mynumb);
                    console.log('Имя '+userName);
                    roomIdCounter++;
                    let rinfo = {
                        id: roomIdCounter,
                        userSock: socket,
                        userName: userName,
                        consTheme: consultTheme,
                        occupied: false,
                        lawsocks: null,
                        roomlog: [{
                            who: 'ю',
                            name: 'Сервер',
                            mes: 'Комната для общения с юристом успешно создана и пользовать добавлен в неё. Приятного общения.'
                        }]
                    };
                    rooms.push(rinfo);
                    newinfo = FindMe(socket);
                    socket.emit('refme', userName, newinfo.permission,newinfo.urid,newinfo.fio,newinfo.avatar,newinfo.desc,newinfo.education,newinfo.staj,newinfo.sessiontime);
                
                    socket.join(roomIdCounter);
                    console.log('Клиент находится в комнате c ID: ' + roomIdCounter);
                    for (let i = 0; i < users.length; i++) {
                        if (users[i].permission != 0) {
                            users[i].sock.emit('roomlistclear');
                            for (let p = 0; p < rooms.length; p++) {
                                users[i].sock.emit('roomlist',rooms[p].id,rooms[p].userName,rooms[p].consTheme,rooms[p].occupied);
                            }
                            users[i].sock.emit('roomlistrebuild');
                        }
                    }
                    socket.emit('successjoin');
                    socket.emit('editroominfo','Ожидается...','https://s3.amazonaws.com/media-p.slid.es/uploads/259608/images/3941391/flat-face-icon-23.png',rinfo.consTheme);
                }
                else {
                    console.log('Возникла ошибка. ПОЛЬЗОВАТЕЛЬ УМЕР НАХУЙ');
                    socket.emit('errorjoin','Похоже, вас не существует');
                }
            }
            else socket.emit('errorjoin','В данный момент нет ни одного юриста в сети!')
        }
        else socket.emit('errorjoin','Введите ваше имя и E-mail')
    });

    // Авторизация юриста
    socket.on('loginur', function(login,pass){
        
        db.query("SELECT * FROM user_passwords WHERE user_login=$1 AND user_password=$2",[login,pass],function (err,ret) {
            if (err) {
              console.error('ЕБАТЬ КАКАЯ ТО ОШИБКА', err);
            }
            else {
                let isJoined = false;
                if (ret.rowCount>0)
                for (let i = 0; i < users.length; i++) {
                    if (users[i].urid == ret.rows[0].id) isJoined = true;
                }
                if (isJoined == false) {
                    console.log(ret);
                    if (ret.rowCount > 0) {
                        console.log('Подключение юриста - успешно');
                        
                        db.query('SELECT * FROM user_info WHERE id=$1',[ret.rows[0].id],function (err,sqlinfo) {
                            console.log(sqlinfo);
                            if (err) {
                            console.error('ЕБАТЬ КАКАЯ ТО ОШИБКА', err);
                            }
                            else {
                                let mynumb = FindMe(socket);
                                if (mynumb != null) {
                                    mynumb.fio = sqlinfo.rows[0].fio;
                                    mynumb.userName = sqlinfo.rows[0].fio;
                                    mynumb.urid = sqlinfo.rows[0].id;
                                    mynumb.avatar = sqlinfo.rows[0].prof_img;
                                    mynumb.desc = sqlinfo.rows[0].description;
                                    mynumb.education = sqlinfo.rows[0].benches;
                                    mynumb.staj = sqlinfo.rows[0].exp;
                                    mynumb.atts_imgs = sqlinfo.rows[0].atts_imgs;
                                    mynumb.permission = sqlinfo.rows[0].perm;
                                    SetMe(socket,mynumb);
                                    newinfo = FindMe(socket);
                                    socket.emit('refme', newinfo.fio, newinfo.permission,newinfo.urid,newinfo.fio,newinfo.avatar,newinfo.desc,newinfo.education,newinfo.staj,newinfo.sessiontime);
                                    console.log('Информация о юристе '+mynumb.fio+' полностью загружена');
                                    newinfo = FindMe(socket);
                                    socket.emit('successlogin', newinfo.fio, newinfo.permission,newinfo.urid,newinfo.fio,newinfo.avatar,newinfo.desc,newinfo.education,newinfo.staj,newinfo.sessiontime);
                                    newinfo.sock.emit('roomlistclear');
                                    for (let p = 0; p < rooms.length; p++) {
                                        newinfo.sock.emit('roomlist',rooms[p].id,rooms[p].userName,rooms[p].consTheme,rooms[p].occupied);
                                    }
                                    newinfo.sock.emit('roomlistrebuild');
                                    console.log('Юрист авторизирован. Список комнат отправлен');
                                }
                                else {
                                    console.log('Возникла ошибка. ПОЛЬЗОВАТЕЛЬ УМЕР НАХУЙ');
                                    socket.emit('errorjoin','Похоже, вас не существует');
                                }
                            }
                        });
                    }
                    else {
                        socket.emit('errorjoin','Неверный логин или/и пароль.');
                        console.log('Подключение юриста - хуёво');
                    }
                }
                else {
                    socket.emit('errorjoin','Вы уже авторизированы на сервере');
                    console.log('Подключение юриста - хуёво');
                }
            }
        });
        
    
    });
  
    // Присоединение Юриста в комнату
    socket.on('roomjoin', function(roomid){
        let mynumb = FindMe(socket);
        if (mynumb.permission > 0 && mynumb != null) {
            socket.join(roomid);
            let roomed = FindRoom(roomid);
            if (roomed.occupied == false) {
                roomed.occupied = true;
                roomed.lawsocks = socket;
                socket.emit('successroomclear');
                for (let p = 0; p < roomed.roomlog.length; p++) {
                    socket.emit('successroom',roomed.roomlog[p].who,roomed.roomlog[p].name,roomed.roomlog[p].mes);
                }
                socket.emit('successroomrebuild');
                for (let i = 0; i < users.length; i++) {
                    if (users[i].permission != 0) {
                        users[i].sock.emit('roomlistclear');
                        for (let p = 0; p < rooms.length; p++) {
                            users[i].sock.emit('roomlist',rooms[p].id,rooms[p].userName,rooms[p].consTheme,rooms[p].occupied);
                        }
                        users[i].sock.emit('roomlistrebuild');
                    }
                }
                roomed.roomlog.push({
                    who: 'ю',
                    name: 'Сервер',
                    mes: 'Юрист '+mynumb.fio+' подключился к чату'
                })
                SetRoom(roomid,roomed);
                socket.to(roomed.id).emit('msgtocnt','ю','Сервер','Юрист '+mynumb.fio+' подключился к чату');
                socket.emit('editroominfo',mynumb.fio,mynumb.avatar,roomed.consTheme);
                roomed.userSock.emit('editroominfo',mynumb.fio,mynumb.avatar,roomed.consTheme);
            }
            else {
                socket.emit('errorjoin','Комната в данный момент занята');
                console.log('Юрист не смог подключиться к комнате '+roomid+' т.к. она занята');
            }
        }
        else {
            socket.emit('errorjoin','У вас нет прав');
            console.log('Юристу не хватило прав для подключения. Возможно, сессия оборвалась или кто-то попытался пробраться в комнату...');
        }
    })

    // Выход юриста или пользователя из комнаты
    socket.on('exitroom', function(){
        let mynumb = FindMe(socket);
        if (mynumb.permission > 0 && mynumb != null) {
            let myroom = FindRoomSockUr(socket);
            if (myroom != null) {
                myroom.lawsocks = null;
                myroom.occupied = false;
                myroom.roomlog.push({
                    who: 'ю',
                    name: 'Сервер',
                    mes: 'Юрист покинул комнату. Ожидается новый юрист...'
                })
                SetRoom(myroom.id,myroom);
                myroom.userSock.emit('editroominfo','Ожидается...','https://s3.amazonaws.com/media-p.slid.es/uploads/259608/images/3941391/flat-face-icon-23.png',myroom.consTheme);
                socket.leave(myroom.id);
                socket.to(myroom.id).emit('msgtocnt','ю','Сервер','Юрист покинул комнату. Ожидается новый юрист...');
                socket.emit('kickur','Вы отключились от комнаты');
                for (let i = 0; i < users.length; i++) {
                    if (users[i].permission != 0) {
                        users[i].sock.emit('roomlistclear');
                        for (let p = 0; p < rooms.length; p++) {
                            users[i].sock.emit('roomlist',rooms[p].id,rooms[p].userName,rooms[p].consTheme,rooms[p].occupied);
                        }
                        users[i].sock.emit('roomlistrebuild');
                    }
                }
            }
        }
        else if (mynumb.permission == 0 && mynumb != null) {
            let myroom = FindRoomSock(socket);
            if (myroom != null) {
                if (myroom.lawsocks != null) {
                    myroom.lawsocks.leave(myroom.id);
                    myroom.lawsocks.emit('kickur','Клиент отключился от сервера');
                }
                socket.leave(myroom.id);
                DeleteRoomSock(socket);
                for (let i = 0; i < users.length; i++) {
                    if (users[i].permission != 0) {
                        users[i].sock.emit('roomlistclear');
                        for (let p = 0; p < rooms.length; p++) {
                            users[i].sock.emit('roomlist',rooms[p].id,rooms[p].userName,rooms[p].consTheme,rooms[p].occupied);
                        }
                        users[i].sock.emit('roomlistrebuild');
                    }
                }
            }     
        }
    })

    // Выход
    socket.on('unlogin', function(){ 
        let mynumb = FindMe(socket);
        if (mynumb != null && mynumb.permission > 0) {
            mynumb = {
                userName: 'Клиент (Неопознан)',
                sock: socket,
                permission: 0,
                urid: null,
                fio: null,
                avatar: null,
                desc: null,
                education: null,
                staj: null,
                sessiontime: 0
            }
            SetMe(socket,mynumb);
        }
        else {
            socket.emit('errorjoin','Вы не авторизированы!');
        }
    });

    // Отправка сообщений
    socket.on('msgtosrv', function(rwho,rname,rmes){ 
        let mynumb = FindMe(socket);
        console.log('Сообщение ('+rwho+', '+rname+'): '+rmes);
        if (mynumb.permission > 0 && mynumb != null) {
            let myroom = FindRoomSockUr(socket);
            let letter = {
                who: 'ю',
                name: rname,
                mes: rmes
            };
            myroom.roomlog.push(letter);
            console.log('Сообщение отправил юрист ('+myroom.id+')');
            socket.to(myroom.id).emit('msgtocnt',letter.who,letter.name,letter.mes);
        }
        else if (mynumb.permission == 0 && mynumb != null) {
            let myroom = FindRoomSock(socket);
            if (myroom != null) {
                let letter = {
                    who: 'к',
                    name: rname,
                    mes: rmes
                };
                myroom.roomlog.push(letter);
                console.log('Сообщение отправил клиент ('+myroom.id+')');
                socket.to(myroom.id).emit('msgtocnt',letter.who,letter.name,letter.mes);
            }
        }
        else {
            socket.emit('error','Ошибка отправки');
            console.log('Отправка пошла не по плану... (Ошибка в комнате '+myroom.id+')');
        }
        
    });

    // Пользователь отключается
    socket.on('disconnect', (reason) => {
        console.log('Пользователь вышел')
        let mynumb = FindMe(socket);
        if (mynumb.permission == 0 && mynumb != null) {
            let myroom = FindRoomSock(socket);
            if (myroom != null) {
                if (myroom.lawsocks != null) {
                    myroom.lawsocks.leave(myroom.id);
                    myroom.lawsocks.emit('kickur','Клиент отключился от сервера');
                }
                socket.leave(myroom.id);
                DeleteRoomSock(socket);
                for (let i = 0; i < users.length; i++) {
                    if (users[i].permission != 0) {
                        users[i].sock.emit('roomlistclear');
                        for (let p = 0; p < rooms.length; p++) {
                            users[i].sock.emit('roomlist',rooms[p].id,rooms[p].userName,rooms[p].consTheme,rooms[p].occupied);
                        }
                        users[i].sock.emit('roomlistrebuild');
                    }
                }
            }
            DeleteMe(socket);
        }
        else if (mynumb.permission > 0 && mynumb != null) {
            let myroom = FindRoomSockUr(socket);
            if (myroom != null) {
                myroom.lawsocks = null;
                myroom.occupied = false;
                myroom.roomlog.push({
                    who: 'ю',
                    name: 'Сервер',
                    mes: 'Юрист покинул комнату. Ожидается новый юрист...'
                })
                SetRoom(myroom.id,myroom);
                socket.leave(myroom.id);
                socket.emit('kickur','Вы отключились от сервера!');
                for (let i = 0; i < users.length; i++) {
                    if (users[i].permission != 0) {
                        users[i].sock.emit('roomlistclear');
                        for (let p = 0; p < rooms.length; p++) {
                            users[i].sock.emit('roomlist',rooms[p].id,rooms[p].userName,rooms[p].consTheme,rooms[p].occupied);
                        }
                        users[i].sock.emit('roomlistrebuild');
                    }
                }
                for (let i = 0; i < users.length; i++) {
                    if (users[i].permission != 0) {
                        users[i].sock.emit('roomlistclear');
                        for (let p = 0; p < rooms.length; p++) {
                            users[i].sock.emit('roomlist',rooms[p].id,rooms[p].userName,rooms[p].consTheme,rooms[p].occupied);
                        }
                        users[i].sock.emit('roomlistrebuild');
                    }
                }
            }
            DeleteMe(socket);
        }
    });

    socket.on('newuser',function(name,pass,fio,description,benches,exp,prof_img){ 
        let mynumb = FindMe(socket);
        if (mynumb.permission > 1) {   
            db.query('SELECT user_login FROM user_passwords WHERE user_login=$1',[name],function (err,checker){
                if (err)
                socket.emit('errorjoin','Регистрация не удалась');
                else
                if (checker.rowCount == 0)
                {
                    if(name&&pass&&fio&&description&&benches&&exp&&prof_img)
                    {
                        db.query("INSERT INTO user_passwords(id,user_login, user_password) VALUES (idchecker(), $1 ,$2 )",[name,pass]);
                        db.query("INSERT INTO user_info(ID, FIO, DESCRIPTION, BENCHES, EXP, PROF_IMG, PERM) VALUES (idchecker2(),$1,$2,$3,$4,$5,1)",[fio,description,benches,exp,prof_img]);
                        socket.emit('errorjoin','Пользователь успешно создан!');
                    }
                    else socket.emit('errorjoin','Заполни все поля!');
                }
                else socket.emit('errorjoin','Пользователь с данным именем существует');
            })
        }
        else socket.emit('errorjoin','У вас недостаточно прав для совершения данной операции');
    })

    socket.on('deluser',function(id){ 
        let mynumb = FindMe(socket);
        if (mynumb.permission > 1) {   
            db.query("DELETE FROM user_info WHERE id=$1",[id],function(err,result){
               if (err){
                   socket.emit('errorjoin','При удалении произошла ошибка в таблице с информацией о юристах');
               } 
               else {
                   console.log('Удаление юриста с id= ',id );
                   db.query("DELETE FROM user_passwords WHERE id=$1",[id],function(err,result){
                    if (err){
                        socket.emit('errorjoin','Приудалении произошла ошибка в таблице логинов');
                    }
                    else { console.log('Удаление прошло успешно');
                    socket.emit('errorjoin','Удаление прошло успешно');    
                }   
                });
               };
            
            });
        }
        else socket.emit('errorjoin','У вас недостаточно прав для этого действия');
    });

    // Могут приходить '' в некоторых значениях. При '' информация не должна заменяться
    socket.on('edituser',function(id,pass,fio,description,benches,exp,prof_img){ 
        let mynumb = FindMe(socket);
        if (mynumb.permission > 1) {

                    if (fio!=='')   
                    db.query("UPDATE user_info SET FIO=$1 WHERE ID=$2",[fio,id],function(err,result){
                        if(err){
                            socket.emit('errorjoin','При редактировании таблицы с информацией произошла ошибка');
                        }
                        else{
                            console.log('Редактирование юриста с id= ', id);
                            
                                socket.emit('errorjoin','Редактирование прошло успешно');
                            }
                            } )

                    if (pass!=='')   
                    db.query("UPDATE user_passwords SET user_password=$1 WHERE ID=$2",[pass,id],function(err,result){
                        if(err){
                            socket.emit('errorjoin','При редактировании таблицы с информацией произошла ошибка');
                        }
                        else{
                            console.log('Редактирование юриста с id= ', id);
                            
                                socket.emit('errorjoin','Редактирование прошло успешно');
                            }
                            } )

                    if (description!=='')   
                    db.query("UPDATE user_info SET desription=$1 WHERE ID=$2",[description,id],function(err,result){
                        if(err){
                            socket.emit('errorjoin','При редактировании таблицы с информацией произошла ошибка');
                        }
                        else{
                            console.log('Редактирование юриста с id= ', id);
                            
                                socket.emit('errorjoin','Редактирование прошло успешно');
                            }
                            } )

                    if (benches!=='')   
                    db.query("UPDATE user_info SET benches=$1 WHERE ID=$2",[benches,id],function(err,result){
                        if(err){
                            socket.emit('errorjoin','При редактировании таблицы с информацией произошла ошибка');
                        }
                        else{
                            console.log('Редактирование юриста с id= ', id);
                            
                                socket.emit('errorjoin','Редактирование прошло успешно');
                            }
                            } )

                    if (exp!=='')   
                    db.query("UPDATE user_info SET exp=$1 WHERE ID=$2",[exp,id],function(err,result){
                        if(err){
                            socket.emit('errorjoin','При редактировании таблицы с информацией произошла ошибка');
                        }
                        else{
                            console.log('Редактирование юриста с id= ', id);
                            
                                socket.emit('errorjoin','Редактирование прошло успешно');
                            }
                            } )
                if (prof_img!=='')   
                    db.query("UPDATE user_info SET prof_img=$1 WHERE ID=$2",[prof_img,id],function(err,result){
                        if(err){
                            socket.emit('errorjoin','При редактировании таблицы с информацией произошла ошибка');
                        }
                        else{
                            console.log('Редактирование юриста с id= ', id);
                            
                                socket.emit('errorjoin','Редактирование прошло успешно');
                            }
                            } )
                
                }
                else socket.emit('errorjoin','У вас недостаточно прав для этого действия');
            } )
            
    

    socket.on('addatt',function(id,att){ 
        let mynumb = FindMe(socket);
        if (mynumb.permission > 1) {    
            db.query('SELECT * FROM user_info WHERE id=$1',[id],function (err,checker){
                if (err)
                socket.emit('errorjoin','Н');
                else
                if (checker.rowCount == 1)
                {
                    if(checker.rows[0].atts_imgs != '')
                    {
                        db.query("UPDATE user_info SET ATTS_IMGS=$2 WHERE ID=$1",[id,checker.rows[0].atts_imgs+','+att], function(err,result){
                            if (err){
                                socket.emit('errorjoin','Произошла ошибка при редактировании аттестатов');
                            }
                            else {
                                console.log('Редактирование прошло успешно');
                                socket.emit('errorjoin','Добавление аттестата прошло успешно');
                            }
                        });
                    }
                    else db.query("UPDATE user_info SET ATTS_IMGS=$2 WHERE ID=$1",[id,checker.att], function(err,result){
                        if (err){
                            socket.emit('errorjoin','Произошла ошибка при редактировании аттестатов');
                        }
                        else {
                            console.log('Редактирование прошло успешно');
                            socket.emit('errorjoin','Добавление аттестата прошло успешно');
                        }
                    });
                }
                else socket.emit('errorjoin','Пользователь с данным ID не существует');
            })
        }
        else socket.emit('errorjoin','У вас недостаточно прав для этого действия');
    })
});
