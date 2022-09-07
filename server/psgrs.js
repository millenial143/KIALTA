const { socket } = require("../src/functions/Socket");

socket.on('newuser',function(name,pass,fio,description,benches,exp,prof_img,atts_imgs,perm){    
    db.query('SELECT user_login FROM user_passwords WHERE user_login=$1',[name],function (err,checker){
        if (err)
         socket.emit('errorjoin','Регистрация не удалась');
        else
        if (checker.rowCount=0)
        {
            if(name&&pass&&fio&&description&&benches&&exp&&prof_img&&atts_imgs&&perm)
            {
                db.query("INSERT INTO user_passwords(id,user_login, user_password) VALUES (idchecker(), $1 ,$2 )",[name,pass]);
                db.query("INSERT INTO user_info(ID, FIO, DESCRIPTION, BENCHES, EXP, PROF_IMG, ATTS_IMGS, PERM) VALUES ( idchecker() ,$1,$2,$3,$4,$5,$6,$7)",[fio,description,benches,exp,prof_img,atts_imgs,perm]);
            }
            else alert('Заполни все поля!');
        }
            else alert('Пользователь с таким логином уже существует');
    })
})


