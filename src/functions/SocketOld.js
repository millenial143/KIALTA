import React from 'react';
import openSocket from 'socket.io-client';
import ChatPage from './../pages/ChatPage';

const socket = openSocket('http://localhost:8000');


let clienttheme;

function urNotactive(){
    window.location.hash='ClientRooms';
}


function lawRet(){
    window.location.hash='ClientRooms';
}


function createReturn(){
    let main=document.querySelector('.main-block');

    let retardbutton=document.createElement('button');

    retardbutton.classList.add('enter-button');
    retardbutton.innerHTML='<span>Вернуться</span>';
    main.appendChild(retardbutton);

    retardbutton.addEventListener('click',lawRet());
}


function createPringes(uristName,name,theme,roomid){   
        console.log(name,theme,roomid);

        let roomspage = document.querySelector('.main-room-block');
        let roomGenerated =  document.createElement('div');

        roomGenerated.classList.add('room-generated');
        roomGenerated.setAttribute('id', roomid);

        let roomInfo = document.createElement('div');
        roomInfo.classList.add('room-info');
        roomGenerated.appendChild(roomInfo);

        let clientName = document.createElement('div');
        clientName.classList.add('room-client-name');
        roomInfo.appendChild(clientName);
        clientName.innerHTML = '<span>' + name + '</span>';
        
        let clientTheme = document.createElement('div');
        clientTheme.classList.add('room-client-theme');
        roomInfo.appendChild(clientTheme);
        clientTheme.innerHTML = '<span>' + theme + '</span>';

        let enterButton = document.createElement('button');
        
        
        enterButton.classList.add('room-enter-button');
        enterButton.innerHTML = '<span>Войти</span>';
        roomGenerated.appendChild(enterButton);

        roomspage.appendChild(roomGenerated);
        
        /*chatWindow = document.getElementById('niger');
        let element = document.createElement('div');
        element.classList.add('en-mes');
        element.innerHTML = '<span>'+ content +'</span>';
        chatWindow.appendChild(element); 
        console.log(element);*/

        enterButton.addEventListener('click', function(event){
            event.preventDefault();
            console.log('Юрист начинает присоединяться к комнате '+roomid)
            socket.emit('uristJoin',uristName,roomid);
            clientid=roomid;
            window.location.hash='Chat';
            
            createReturn();

            socket.on('notactive',function(){
                alert('Клиент вышел из чата');
                setTimeout(1000);
                urNotactive();
            });
            chatStart();
        })
    
};

export function LawyerAuthorized(uristName){
    socket.emit('lawyerAuth',uristName);
    console.log(uristName);
    console.log(window.location.hash);
    socket.on('roomupdate', function(){
        if (window.location.hash=='#/ClientRooms')
        {
        let roomArr = document.querySelectorAll('.room-generated');
             for (let i of roomArr)
             {
                         
              i.remove();
                
             }
        }
    }
    );
    socket.on('sendPringles', function(username,constheme,roomid,occupied) {
        if (window.location.hash=='#/ClientRooms'&& occupied==false)
        {
            createPringes(uristName,username,constheme,roomid);
        }
        }
    );  
};

export function hChat(){
    console.log('Клиент присоединяется');

    socket.emit('clientJoin',document.getElementById('login').value,clienttheme);

    window.location.hash='Chat';
}






export function chatStart() {
    let button = document.querySelector('.enter-button');
    let textArea = document.querySelector('.text-field');
    let shiftCheck = false;
    let userId;
    let chatWindow = document.getElementById('niger');



    console.log(chatWindow);
    console.log('Script is online');
    

    socket.on('messageToClient', (content) => {
        if(content){
            console.log(content);
            chatWindow = document.getElementById('niger');
            let element = document.createElement('div');
            element.classList.add('en-mes');
            element.innerHTML = '<span>'+ content +'</span>';
            chatWindow.appendChild(element); 
            console.log(element);
        };
    }); 
    
    socket.on('sendIdToClient', function(id){
        console.log('ЗДЕСЯ АЙДИ'+id);
        clientid=id;  
        socket.emit('pringles', clientid);
        chatStart();

        socket.emit('pringles', clientid);
        
        socket.on('ping',(i)=>{
            socket.emit('pringles', clientid);
            console.log(i,' pringles ',clientid);
            if (window.location.hash!='#/Chat')
            socket.removeListener('ping');
        });
    }) 
}

export function hClientJoin(theme){
    clienttheme=theme;
    window.location.hash='ClientJoin'
}


