import React from 'react';
import openSocket from 'socket.io-client';
import {socket,urtheme} from './../functions/Socket';



class ClientJoinPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "", 
        };
        this.loginEdit = this.loginEdit.bind(this);
        this.stertroom = this.stertroom.bind(this);
    }

    loginEdit(e){
        this.setState({login: e.target.value});
    }
    
    stertroom(){
        socket.emit('createroom',document.getElementById('login').value,urtheme);
        console.log('Отправка сообщения создания комнаты')
    }

    render() {
        return (
        <>
        <div>
        <span className={'auth-name'}>Клиентский чат</span>
            <div className={'auth-block'}>
                <input id='login' name='login' onChange={this.loginEdit} placeholder="Как к вам обращаться?" type="text"/>
                <button id='auth' onClick={()=> this.stertroom()} >
                    Войти в чат
                </button>
                <span className={'auth-info'}>Весь разговор с юристом является полностью анонимным и после выхода из комнаты с чатом удаляется с серверов КИАЛТА</span>
            </div>
        </div>
        </>   
        )
    }
}

export default ClientJoinPage;