const { TRUE } = require('node-sass');

const io = require('socket.io')();
let userIdCounter = 0;

let rooms=[];
let ursocks=[];






function newRoom(name,theme,id,sock)
{
  rooms.push({
    userName: name,
    consTheme: theme,
    roomId: id,
    active: true,
    occupied: false,
    clsocks: sock,
    lawsocks: null
  });
  console.log('Создана новая комната: ',rooms[rooms.length-1]);
  roomUpdate();
}

function tennis()
{
  console.log('Пингование...')
  for(let i in rooms)
  {
    rooms[i].clsocks.emit('ping',i);
    console.log('Пингуем комнату ',rooms[i].roomId);
  }
}

function roomUpdate(){
  for(let i in ursocks){
    ursocks[i].emit('roomupdate');
    for(let j in rooms)
      ursocks[i].emit('sendPringles', rooms[j].userName,rooms[j].consTheme,rooms[j].roomId, rooms[j].occupied);
  }
  console.log('Обновление комнат...')
}

function fuckThisRooms(){
  console.log('Чистка неактивных комнат');
  for(let i in rooms)
  {
    console.log('Проверка комнаты ', rooms[i].roomId,' ',rooms[i].active);
    if (rooms[i].active==false)
    {
      if(rooms[i].lawsocks!=null) rooms[i].lawsocks.emit('notactive');
      rooms.splice(i,1);
      i--;
      
      roomUpdate();
    }
    else 
    {
      rooms[i].active=false;
    }
  }
}



io.on('disconnection', function(socket) {
});

io.on('connection', function(socket) {

  console.log('Подключён новый пользователь');
  socket.on('clientJoin',function(userName,consultTheme){
    console.log('Имя нового пользователя '+userName);
      userIdCounter++;
      socket.emit('sendIdToClient', userIdCounter);
      socket.join(userIdCounter);
      console.log('Клиент находится в комнате ' + userIdCounter);
      socket.broadcast.emit('roomCreation',userName,consultTheme,userIdCounter);
      newRoom(userName,consultTheme,userIdCounter, socket);
  });

  socket.on('uristJoin', function(uristName,id){
    console.log('Присоединение юриста');
    socket.to(id).emit('messageToClient','К вам присоединился юрист '+uristName);
    console.log(uristName,id);
    socket.join(id);
    // socket.broadcast.emit('roomOccupied',id);
    for (let i in rooms)
    {
      if (rooms[i].roomId==id)
      rooms[i].occupied=true;
      rooms[i].lawsocks=socket;
    }
    roomUpdate();
  });
  
  socket.on('lawyerAuth', function(urname){
    console.log(urname, ' авторизовался');
    ursocks.push(socket);
    roomUpdate();
  });
  
  socket.on('messageToServer', function(msg, id){ 
    console.log('Сообщение комнаты '+id+': '+msg);
    socket.to(id).emit('messageToClient',msg);
  });

  
  socket.on('pringles', function(id){
    console.log('pongreceived ',id);
    for(let i in rooms)
  {
    
    if(rooms[i].roomId==id)
    {
      console.log('Оставляю активной комнату ',rooms[i].roomId);
      rooms[i].active=true;
    }
  }
  });


});




const port = 8000;
io.listen(port);
console.log('listening on port ', port);

setInterval(function(){
  console.log('Пингую');
  tennis();
  setTimeout(function(){},4999);
  fuckThisRooms();

}, 5000);
