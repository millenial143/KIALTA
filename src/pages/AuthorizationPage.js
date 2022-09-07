import React from 'react';
import openSocket from 'socket.io-client';
import {socket, client} from './../functions/Socket';

let uristName='';

class AuthorizationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        };
        this.loginEdit = this.loginEdit.bind(this);
        this.passEdit = this.passEdit.bind(this);
        this.auth = this.auth.bind(this);
        this.hClientRooms = this.hClientRooms.bind(this);
    }

    auth(e){
        alert(this.state.login + ' ' + this.state.password);
    }

    loginEdit(e){
        this.setState({login: e.target.value});
    }

    passEdit(e){
        this.setState({password: e.target.value});
    }

    checker(){
        if (client.permission > 0) {
            window.location.hash='ClientRooms';
        }
    }

    hClientRooms(){
        socket.emit('loginur',document.getElementById('logur').value,document.getElementById('pasur').value)
        document.getElementById('logur').value = ''; 
        document.getElementById('pasur').value = ''; 
        console.log('Попытка авторизации');
        this.setState({
            login: '',
            password: '',
        })
    }

    render() {
        return (
        <>
        <div className={'auth-block'}>
            <span className={'auth-name'}>Авторизация</span>
            <div className='auth-block' onLoad={this.checker()}>
                <input id='login' name='login' id='logur' onChange={this.loginEdit} placeholder="Введите логин" type="text"/>
                <input id='password' type='password' name='password' id='pasur' onChange={this.passEdit} placeholder="Введите пароль" type="text"/>
                <button id='auth' onClick={this.hClientRooms} >
                    Вход
                </button>

            </div>
                <span className={'auth-info'}>Для получения данных для авторизации на сайте - обратитесь к администрации КИАЛТА. Регистрация новых пользователей проходит только через администраторов сайта</span>
        </div>
        </>   
        )
    }
}

export default AuthorizationPage;