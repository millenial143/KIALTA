import React from 'react';
import openSocket from 'socket.io-client';
import {chatStart, chatSend} from './../functions/Socket';

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: 2
        };
    }


    /*chat(){
        
        let button = document.querySelector('.enter-button');
        let chatWindow = document.querySelector('.chat-block');
        let textArea = document.querySelector('.text-field');
        let shiftCheck = false;
        let userId;

        let n = function(event) {
            if(event.keyCode == 13 ){
        
                let val = document.querySelector('.text-field').value;
                document.querySelector('.text-field').value = '';
                
                if(val){
                    socket.emit('messageToServer', val);
                    let element = document.createElement('div');
                    element.classList.add('my-mes');
                    element.innerHTML = '<span>' + val + '</span>';
                    chatWindow.appendChild(element); 
                };
            }
        };
        
        document.addEventListener('keydown',function(event) {
            if(event.keyCode == 16){
                textArea.removeEventListener('keydown',n)
            }    
        });
        
        document.addEventListener('keyup',function(event) {
            if(event.keyCode == 16){
                textArea.addEventListener('keydown',n);
            }    
        });
        
        textArea.addEventListener('keydown',n);
    }
*/

    render() {
        return (
        <>
            <div className={"main-block"} onLoad={chatStart()}>
                <div className={"lawer-name"}>
                    <div className={"lawer-avatar"}></div>
                    <div className={"lawer-name-name"}>
                        <div><span>Михаил Светов</span></div>
                        <div><span>Сфера административного права</span></div>
                    </div>
                </div>
                
                <div className={"chat-window"}>
                    <div id={'niger'} className={'chat-block'}>
                        <div className={"my-mes"}>
                            <span>Юрий Дудь — лохопед</span>
                        </div>
                        <div className={"en-mes"}>
                            <span>Сергей Шнуров — долбоёб</span>
                        </div>
                        <div className={"my-mes"}>
                            <span>Иван Ургант — говноед</span>
                        </div>
                        <div className={"en-mes"}>
                            <span>Окси — музыку поёт</span>
                        </div>
                        <div className={"my-mes"}>
                            <span>Миша Паньшин — русский рэп</span>
                        </div>
                        <div className={"en-mes"}>
                            <span>Ресторатор — баттл-рэп</span>
                        </div>
                        <div className={"my-mes"}>
                            <span>Рядом срать с вами не сяду Рядом срать с вами не сяду
                                Рядом срать с вами не сяду Рядом срать с вами не сяду Рядом срать с вами не сяду Рядом срать с вами не сяду Рядом срать с вами не сяду</span>
                        </div>
                        <div className={"en-mes"}>
                            <span>Ричард третий — заебись!</span>
                        </div>
                    </div>
                    
                </div>
                <div className={"message-window"}>
                    <form >
                        <textarea name="" id="" className={"text-field"}></textarea>
                        
                        <button className={"enter-button"} onClick={() => chatSend(document.querySelector('.text-field').value)}>Отправить</button>
                    </form>
                    
                </div>
            </div>
        </>   
        )
    }
}

export default ChatPage;