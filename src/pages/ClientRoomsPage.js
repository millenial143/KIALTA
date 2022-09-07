import React from 'react';
import {client, socket, SetClient} from './../functions/Socket';


class ClientRoomsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            login:'',
            pass:'',
            staj:'',
            image:'',
            education:'',
            fio:'',
            desc:'',

            edid:'',
            edpass:'',
            edstaj:'',
            edimage:'',
            ededucation:'',
            edfio:'',
            eddesc:'',

            delid:'',
            attid:'',

            rooms: []
        };
        this.joinroom = this.joinroom.bind(this);
        this.socketList = this.socketList.bind(this);
        this.socketListener= this.socketListener.bind(this);
        this.checker= this.checker.bind(this);
        this.exitaccount= this.exitaccount.bind(this);

        this.newLogin=this.newLogin.bind(this);
        this.newPass=this.newPass.bind(this);
        this.newStaj=this.newStaj.bind(this);
        this.newImage=this.newImage.bind(this);
        this.newEducation=this.newEducation.bind(this);
        this.newFio=this.newFio.bind(this);
        this.newDesc=this.newDesc.bind(this);

        this.idEdit=this.idEdit.bind(this);
        this.passEdit=this.passEdit.bind(this);
        this.stajEdit=this.stajEdit.bind(this);
        this.imageEdit=this.imageEdit.bind(this);
        this.educationEdit=this.educationEdit.bind(this);
        this.fioEdit=this.fioEdit.bind(this);
        this.descEdit=this.descEdit.bind(this);
        this.createacc=this.createacc.bind(this);

        this.delEdit=this.delEdit.bind(this);
        this.attEdit=this.attEdit.bind(this);
    }

    delEdit(e){
        this.setState({delid: e.target.value});
    }

    attEdit(e){
        this.setState({attid: e.target.value});
    }

    newLogin(e){
        this.setState({login: e.target.value});
    }

    newPass(e){
        this.setState({pass: e.target.value});
    }

    newStaj(e){
        this.setState({staj: e.target.value});
    }

    newImage(e){
        this.setState({image: e.target.value});
    }

    newEducation(e){
        this.setState({education: e.target.value});
    }

    newFio(e){
        this.setState({fio: e.target.value});
    }

    newDesc(e){
        this.setState({desc: e.target.value});
    }



    idEdit(e){
        this.setState({edid: e.target.value});
    }

    passEdit(e){
        this.setState({edpass: e.target.value});
    }

    stajEdit(e){
        this.setState({edstaj: e.target.value});
    }

    imageEdit(e){
        this.setState({edimage: e.target.value});
    }

    educationEdit(e){
        this.setState({ededucation: e.target.value});
    }

    fioEdit(e){
        this.setState({edfio: e.target.value});
    }

    descEdit(e){
        this.setState({eddesc: e.target.value});
    }

    




    joinroom(itid) {
        socket.emit('roomjoin',itid);
        console.log('Отправка запроса на подсоединение к комнате');
    }

    checker(){
        if (client.permission == 0 || client == []) {
            window.location.hash='Autorization';
        }
    }

    socketList(){
        let listMess = this.state.rooms.map((info,i) =>
        <div className={info.occupied} key={i}>
            <div className={'room-info'}>
                <div className={'room-client-name'}>
                    <span>{info.userName}</span>
                </div> 
                <div className={'room-client-theme'}>
                    <span>{info.consTheme}</span>
                </div>
            </div>
            <button className={'room-enter-button'} onClick={() => this.joinroom(info.id)}>
                Войти    
            </button>    
        </div>
        );
        
        return (
          <>{listMess}</>
        );
        
        console.log('Страница перерендерина');
    }

    createacc(){
        if (this.state.login != '' && this.state.pass != '' && this.state.fio != '' && this.state.desc != '' && this.state.education != '' && this.state.staj != '' && this.state.image != '') {
            socket.emit('newuser',this.state.login,this.state.pass,this.state.fio,this.state.desc,this.state.education,this.state.staj,this.state.image);
            document.getElementById('alogin').value = '';
            document.getElementById('apass').value = '';
            document.getElementById('aexp').value = '';
            document.getElementById('aprofimg').value = '';
            document.getElementById('afio').value = '';
            document.getElementById('abench').value = '';
            document.getElementById('adesc').value = '';
            this.setState({
                login:'',
                pass:'',
                staj:'',
                image:'',
                education:'',
                fio:'',
                desc:'',
            });
        }   
        else alert('Заполните все поля!');
    }

    editacc(){
        socket.emit('edituser',this.state.edid,this.state.edpass,this.state.edfio,this.state.eddesc,this.state.ededucation,this.state.edstaj,this.state.edimage);
        document.getElementById('elogin').value = '';
        document.getElementById('epass').value = '';
        document.getElementById('eexp').value = '';
        document.getElementById('eprofimg').value = '';
        document.getElementById('efio').value = '';
        document.getElementById('ebench').value = '';
        document.getElementById('edesc').value = '';
        this.setState({
            edlogin:'',
            edpass:'',
            edstaj:'',
            edimage:'',
            ededucation:'',
            edfio:'',
            eddesc:'',
        });
    }

    delacc(){
        socket.emit('deluser',this.state.delid);
        document.getElementById('dacc').value = '';
        this.setState({
            delid:''
        });
    }

    addatt(){
        socket.emit('addatt',this.state.delid,this.state.attid);
        document.getElementById('dacc').value = '';
        document.getElementById('datt').value = '';
        this.setState({
            delid:'',
            attid:''
        });
    }

    exitaccount(){
        window.location.hash='';
        SetClient([]);
        alert('Вы вышли');
        socket.emit('unlogin');
    }

    an(){
        window.location.hash='';
        SetClient([]);
        alert('Вы вышли');
        socket.emit('unlogin');
    }

    socketListener(){
        let rooming = [];
        socket.removeAllListeners('roomlist');
        socket.removeAllListeners('roomlistclear');
        socket.removeAllListeners('roomlistrebuild');
        socket.on('roomlist', (rid,ruserName,rconsTheme,roccupied) => {
            console.log('Добавлена комната: '+ruserName);
            let room = {
                id: rid,
                userSock: 'ITS HITLER',
                userName: ruserName,
                consTheme: rconsTheme,
                occupied: roccupied,
                lawsocks: 'ITS MEEEE!'
            }
            if (room.occupied == false) room.occupied = 'room-generated';
            if (room.occupied == true) room.occupied = 'room-generated-close';
            rooming.push(room)
        });
        socket.on('roomlistclear', () => {
            console.log('Комнаты отчищены');
            rooming = [];
        });
        socket.on('roomlistrebuild', () => {
            console.log('Комнаты занесены в стейты');
            this.setState({rooms: rooming});
        });
    }
    
    render() {
        return (
        <>
            <div className={'main-room-block'} onLoad={this.socketListener()}>
                <div className={'room-title-block'} onLoad={this.checker()}>
                    <span> Информация </span>
                </div>
                <div className={'room-list'}>
                    <div className={'info-list'}>
                        <img src={client.avatar} className={'info-av'}></img>
                        <div className={'info-info'}>
                            <span><b>ФИО: </b>{client.fio}</span><br/>
                            <span><b>Описание: </b>{client.desc}</span><br/>
                            <span><b>Образование: </b>{client.education}</span><br/>
                            <span><b>Стаж: </b>{client.staj} года/лет</span><br/>
                            <span><b>Время сессии: </b>{client.sessiontime}</span><br/>
                            <button className={'info-exit'} onClick={() => this.exitaccount()}>Выход</button>
                        </div>
                    </div>    
                </div>
                <div className={'room-title-block'}>
                    <span> Панель администрации </span>
                </div>
                <div className={'room-list'}>
                    <div className={'info-list2'}>
                        <div className={'admin-line'}>
                            <button className={'admin-btn'} onClick={() => this.createacc()}>+</button>
                            <div className={'admin-insert'}>
                                <div className={'admin-miniline'}>  
                                    <input id='alogin' className={'admin-text'} onChange={this.newLogin} placeholder="Логин" type="text"/>
                                    <input id='apass' className={'admin-text'} onChange={this.newPass} placeholder="Пароль" type="text"/>
                                    <input id='aexp' className={'admin-text'} onChange={this.newStaj} placeholder="Стаж" type="text"/>
                                    <input id='aprofimg' className={'admin-text'} onChange={this.newImage} placeholder="Ссылка на изображение" type="text"/>
                                </div>
                                <div className={'admin-miniline'}>
                                    <input id='abench' className={'admin-text'} onChange={this.newEducation} placeholder="Образование" type="text"/>
                                    <input id='afio' className={'admin-text'} onChange={this.newFio} placeholder="ФИО" type="text"/>
                                    <input id='adesc' className={'admin-text2'} onChange={this.newDesc} placeholder="Описание" type="text"/>
                                </div>
                            </div>
                        </div>
                        <div className={'admin-line'}>
                            <button className={'admin-btne'} onClick={() => this.editacc()}>/</button>
                            <div className={'admin-insert'}>
                                <div className={'admin-miniline'}>  
                                    <input id='elogin' className={'admin-text'} onChange={this.idEdit} placeholder="ID редактируемого" type="text"/>
                                    <input id='epass' className={'admin-text'} onChange={this.passEdit} placeholder="Пароль" type="text"/>
                                    <input id='eexp' className={'admin-text'} onChange={this.stajEdit} placeholder="Стаж" type="text"/>
                                    <input id='eprofimg' className={'admin-text'} onChange={this.imageEdit} placeholder="Ссылка на изображение" type="text"/>
                                </div>
                                <div className={'admin-miniline'}>
                                    <input id='ebench' className={'admin-text'} onChange={this.educationEdit} placeholder="Образование" type="text"/>
                                    <input id='efio' className={'admin-text'} onChange={this.fioEdit} placeholder="ФИО" type="text"/>
                                    <input id='edesc' className={'admin-text2'} onChange={this.descEdit} placeholder="Описание" type="text"/>
                                </div>
                            </div>
                        </div>
                        <div className={'admin-line'}>
                            <button className={'admin-btnlite-red'} onClick={() => this.delacc()}>X</button>
                            <input id='dacc' className={'admin-text'} onChange={this.delEdit} placeholder="ID редактируемого" type="text"/>
                            <input id='datt' className={'admin-text2'} onChange={this.attEdit} placeholder="Ссылка на аттестат" type="text"/>
                            <button className={'admin-btnlite-blue'} onClick={() => this.addatt()}>Добавить аттестат</button>
                        </div>
                    </div>    
                </div>
                <div className={'room-title-block'}>
                    <span> Комнаты </span>
                </div>
                <div className={'room-list'}>{this.socketList()}</div>
            </div>
        </>   
        )
    }
}

export default ClientRoomsPage;