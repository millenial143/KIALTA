//import e from 'express';
//import e from 'express';
import React from 'react';
import {chatStart, chatSend} from './../functions/Socket';

let userId;

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: 0,
            chat: [
                {
                    who: 'me',
                    mes: 'Хуедыпола'
                }
            ]
        };

    }

    getid(id){
        this.setState({pid: id});
    }

    sender(){
        var textin = document.getElementById('sendpage').value
        if (textin != '') {;
            var mychat = this.state.chat;
            mychat.push(
                {
                    who: 'me',
                    mes: textin
                }
            );
            this.setState({
                chat: mychat
            })
            let chatWindow = document.querySelector('.chat-block');
            let element = document.createElement('div');
            element.classList.add('my-mes');
            element.innerHTML = '<span>' + textin + '</span>';
            chatWindow.appendChild(element); 
            document.getElementById('sendpage').value = '';
            chatSend(textin);
        }
    }

    render() {
        return (
        <>
            <div className={'main-block'} >
                <div className={'lawer-name'}>
                    <div className={'lawer-avatar'}></div>
                    <div className={'lawer-name-name'}>
                        <div><span>Михаил Светов</span></div>
                        <div><span>Сфера административного права</span></div>
                    </div>
                </div>
                
                <div className={'chat-window'}>
                    <div id={'niger'} className={'chat-block'}>
                        <div className={'my-mes'}>
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
                        </div>
                    </div>
                    
                </div>
                <div className={'message-window'}>
                        <textarea name='' id='sendpage' className={'text-field'}></textarea>
                        
                        <button className={'enter-button'} onClick={() => this.sender()}>Отправить</button>     
                </div>
            </div>
        </>   
        )
    }
}

export default ChatPage;