import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import {
    HashRouter,
    Route
} from 'react-router-dom';

import InfoPage from './pages/InfoPage';

import {socket, client, SetClient, AddLayer}from './functions/Socket';
import LawyersPage from './pages/LawyersPage';
import StartPage from './pages/StartPage';
import Preview from './pages/Preview';
import AuthorizationPage from './pages/AuthorizationPage';
import ChatPage from './pages/ChatPage';
import ClientRoomsPage from './pages/ClientRoomsPage';
import ClientJoinPage from './pages/ClientJoinPage';
socket.emit('needporn');
console.log('NEED FURRY');


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
      };
      this.socketListener = this.socketListener.bind(this);
  }

  socketListener() {
    socket.removeAllListeners('refme');
    socket.removeAllListeners('errorjoin');
    socket.removeAllListeners('successlogin');
        
    socket.on('refme', (userName,permission,urid,fio,avatar,desc,education,staj,sessiontime) => {
      SetClient({
            userName: userName,
            sock: 'ITISSOCKET!',
            permission: permission,
            urid: urid,
            fio: fio,
            avatar: avatar,
            desc: desc,
            education: education,
            staj: staj,
            sessiontime: sessiontime
        });
        console.log('Обновлена локальная информация');
    });    
    socket.on('errorjoin', (reason) => {
        console.log('Произошла ошибка: '+reason); 
        alert(reason);
    });
    
    socket.on('successlogin', (userName,permission,urid,fio,avatar,desc,education,staj,sessiontime) => {
      console.log('Ник '+userName);
      console.log('Право '+permission);
      console.log('ID DB '+urid);
      console.log('ФИО '+fio);
      console.log('Аватар '+avatar);
      console.log('Описание '+desc);
      console.log('Образование '+education);
      console.log('Стаж '+staj);
      console.log('Сессия '+sessiontime);
        SetClient({
            userName: fio,
            sock: 'ITISSOCKET!',
            permission: permission,
            urid: urid,
            fio: fio,
            avatar: avatar,
            desc: desc,
            education: education,
            staj: staj,
            sessiontime: sessiontime
        });
        console.log('Обновлен клиент');
        window.location.hash='ClientRooms'
    });
  }

  hLawers() {
    window.location.hash = 'Lawyers';
    socket.emit('needporn');
  }

  hMain() {
    window.location.hash = '';
  }

  hInfo() {
    window.location.hash='Info'
  }

  hAuth() {
    window.location.hash='Authorization'
  }

  render() {
    return (
      <>
      <div className={'App'} onLoad={this.socketListener()}>
        <ChatPage />
        <header className={'header'}>
          <div className={'header-block'}>
            <div className={'logo'} onClick={this.hMain}>
              <div className={'logoup'}>КИАЛТА</div>
              <div className={'logodown'}>ЮРИДИЧЕСКОЕ АГЕНСТВО</div>
            </div>
            <div className={'btns-menu'}>
              <button className={'btn-head-style btn-active'} onClick={this.hMain}>
              <span>Консультации </span>  
              </button>
              <button className={'btn-head-style sotr'} onClick={this.hLawers}>
              <span>Сотрудники</span>
              </button>
              <button className={'btn-head-style'} onClick={this.hInfo}>
              <span>Связаться </span>     
              </button>
              <button className={'btn-head-style btn-autorization'} onClick={this.hAuth}>
                <span>Вход сотрудника</span>
              </button>

              
            </div>
          </div>
        </header>
        <div className={'modal-window'}></div>
        <div className={'boder'}>
          <div className={'adblock'}></div>
          <div className={'page'}>
            <Preview />
            <div className={'content'}> 
              <HashRouter ref={this.routerRef}>
                <Route path={'/'} exact component={StartPage} />
                <Route path={'/Lawyers'} exact component={LawyersPage} />
                <Route path={'/Info'} exact component={InfoPage} />
                <Route path={'/Authorization'} exact component={AuthorizationPage} />
                <Route path={'/ClientRooms'} exact component={ClientRoomsPage} />
                <Route path={'/ClientJoin'} exact component={ClientJoinPage} />
              </HashRouter>
            </div>
            
          </div>
          <div className={'adblock'}></div>
        </div>
        <div className={'footer'}>
          <div className={'footer-left'}>Леонид and Вовочка Production | 2020 год</div>
          <div className={'footer-right'}>Леонид and Вовочка Production | 2020 год</div>
          
        </div>        
      </div>
      </>
    );
  }
}

export default App;




