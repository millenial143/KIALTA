//import e from 'express';
//import e from 'express';
import React from 'react';
import {socket, client, resmes} from './../functions/Socket';

let userId;

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: [],
            mymess: '',
            theme: '',
            ava: '',
            urName: ''
        };
        this.socketListener = this.socketListener.bind(this);
        this.chatrend = this.chatrend.bind(this);
        this.getid = this.getid.bind(this);
        this.sender = this.sender.bind(this);
        this.closewin = this.closewin.bind(this);

    }
    

    socketListener() {
        let chatting = [];

        socket.removeAllListeners('successroomclear');
        socket.removeAllListeners('successroom');
        socket.removeAllListeners('msgtocnt');
        socket.removeAllListeners('successroomrebuild');
        socket.removeAllListeners('successjoin');
        socket.removeAllListeners('kickur');
        
        socket.on('msgtocnt', (rwho,rname,chatmess) => {
            console.log('msg');
            let chatter = {
                who: rwho,
                name: rname,
                mes: chatmess
            }
            if (client.permission == 0) {
                    if (chatter.who == 'ю') chatter.who = 'en-mes';
                    if (chatter.who == 'к') chatter.who = 'my-mes';
            }
            else {
                    if (chatter.who == 'к') chatter.who = 'en-mes';
                    if (chatter.who == 'ю') chatter.who = 'my-mes';
            }
            let gay = this.state.chat;
            gay.push(chatter);
            this.setState({
                chat: gay,
            });

        });
        socket.on('successroomclear', () => {
            this.setState({
                chat: []
            });
            console.log('Отчистка старой истории'); 
            var vmodal = document.getElementById('chat');
            vmodal.style.display = "block";
            chatting = [];
        });
        socket.on('editroominfo', (eName, eAva, eTheme) => {
            this.setState({
                theme: eTheme,
                ava: eAva,
                urName: eName
            });
            console.log('Информация о комнате изменена');
        });
        socket.on('successroom', (cwho,cname,cmes) => {
            console.log('Загрузка сообщения'); 
            var vmodal = document.getElementById('chat');
            vmodal.style.display = "block";
            let siska = {
                who: cwho,
                name: cname,
                mes: cmes
            }
            if (client.permission == 0) {
                    if (siska.who == 'ю') siska.who = 'en-mes';
                    if (siska.who == 'к') siska.who = 'my-mes';
            }
            else {
                    if (siska.who == 'к') siska.who = 'en-mes';
                    if (siska.who == 'ю') siska.who = 'my-mes';
            }
            chatting.push(siska);
        });
        socket.on('successroomrebuild', () => {
            console.log('Информация успешно загружена'); 
            this.setState({chat: chatting});
        });
        socket.on('successjoin', (room) => {
            console.log('Вы присоединились к комнате'); 
            var vmodal = document.getElementById('chat');
            vmodal.style.display = "block";
        });
        socket.on('kickur', (reason) => {
            var vmodal = document.getElementById('chat');
            vmodal.style.display = "none";
            console.log('Вы были отключены от комнаты'); 
            alert(reason);
            this.setState({
                chat: []
            });
        });
    }

    chatrend() {
        let listMess = this.state.chat.map((info,i) =>
        <div className={info.who} key={i}>
            <span className={'mes-sender'}>{info.name}</span><br/>
            <span>{info.mes}</span>
        </div>
        );
        return (
          <ul>{listMess}</ul>
        );
    }

    getid(id){
        this.setState({pid: id});
    }

    sender(){
        if (document.getElementById('sendpage').value != '') {;
            var mychat = this.state.chat;
            let addNew = 
            {
                who: 'my-mes',
                name: client.userName,
                mes: document.getElementById('sendpage').value
            }
            mychat.push(addNew);
            this.setState({
                chat: mychat,
            });
            socket.emit('msgtosrv',addNew.who,addNew.name,addNew.mes);
            document.getElementById('sendpage').value = '';
        }
    }

    closewin(e) {
        var vmodal = document.getElementById('chat');
            vmodal.style.display = "none";
            console.log('Вы вышли из комнаты'); 
            socket.emit('exitroom');
    }

    render() {
        return (
        <>
            <div className={'modal'} id='chat' onLoad={this.socketListener()}>
            <div className={'main-block'}>
                <div className={'lawer-name'}>
                    <img src={this.state.ava} className={'lawer-avatar'}></img>
                    <div id={'lawer-info'} className={'lawer-name-name'}>
                        <div><span>{this.state.urName}</span></div>
                        <div><span>{this.state.theme}</span></div>
                    </div>
                </div>
                
                <div className={'chat-window'}>
                    <div id={'niger'} className={'chat-block'}>
                        {/* <div className={'my-mes'}>
                            <span>Юрий Дудь — лохопед</span>
                        </div>
                        <div className={'en-mes'}>
                            <span>Сергей Шнуров — долбоёб</span>
                        </div>
                        <div className={'my-mes'}>
                            <span>Иван Ургант — говноед</span>
                        </div>
                        <div className={'en-mes'}>
                            <span>Окси — музыку поёт</span>
                        </div>
                        <div className={'my-mes'}>
                            <span>Миша Паньшин — русский рэп</span>
                        </div>
                        <div className={'en-mes'}>
                            <span>Ресторатор — баттл-рэп</span>
                        </div>
                        <div className={'my-mes'}>
                            <span>Рядом срать с вами не сяду Рядом срать с вами не сяду
                                Рядом срать с вами не сяду Рядом срать с вами не сяду Рядом срать с вами не сяду Рядом срать с вами не сяду Рядом срать с вами не сяду</span>
                        </div>
                        <div className={'en-mes'}>
                            <span>Ричард третий — заебись!</span>
                        </div> */}
                        {this.chatrend()}
                    </div>
                    
                </div>
                <div className={'message-window'}>
                        <textarea name='sendpage' id='sendpage' className={'text-field'}></textarea>
                        
                        <button className={'enter-button'} onClick={() => this.sender()}>Отправить</button>     
                </div>
                <button className={'close-button'} onClick={() => this.closewin()}>Закрыть окно</button>   
            </div>
            </div>
        </>   
        )
    }
}

export default ChatPage;