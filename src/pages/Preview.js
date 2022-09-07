import React from 'react';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: 1
        };
    }
    
    componentDidMount() {
      this.timerId = setInterval(
        ()=> this.prereload(),
        7000
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerId);
    }

    prereload () {
        if (this.state.pid < 3) {
            this.setState({
                pid: this.state.pid+1
            })
        }
        else {
            this.setState({
                pid: 1
            })
        }
    }

    prebackload () {
        var id = this.state.pid;
        if (id > 1) {
            this.setState({
                pid: id-1
            })
        }
        else {
            this.setState({
                pid: 3
            })
        }
    }
    
    loadin() {
        var id = this.state.pid;
        if (id == 1) {
            return (
                <div className={'prev1 slider'}>
                <button className={'bt-left'} onClick={()=>this.prebackload()}></button>
                <div className={'prev-m'}>
                    <div className={'prev-header'}>
                        Заливают говном соседи через дырку в потолке?
                    </div>
                    <div className={'prev-desc'}>
                        Поговорите с нами, наш юрист насрёт ему вверх
                    </div>
                </div>
                <button className={'bt-right'} onClick={()=>this.prereload()}></button>
                </div>
            )
        }
        else if (id == 2) {
            return (
                <div className={'prev2 slider'}>
                <button className={'bt-left'} onClick={()=>this.prebackload()}></button>
                <div className={'prev-m'}>
                    <div className={'prev-header'}>
                        Ваша мать сдохла?
                    </div>
                    <div className={'prev-desc'}>
                        Наше агенство поможет вам переоформить её пенсионные и квартиру на вас, полностью отберёт имущество и поможет жить вашей матери ещё 2 года в бумагах, чтобы получать её пенсию
                    </div>
                </div>
                <button className={'bt-right'} onClick={()=>this.prereload()}></button>
                </div>
            )            
        }
        else {
            return (
                <div className={'prev3 slider'}>
                <button className={'bt-left'} onClick={()=>this.prebackload()}></button>
                <div className={'prev-m'}>
                    <div className={'prev-header'}>
                        Проблемы с доступом к JoyCasino?
                    </div>
                    <div className={'prev-desc'}>
                        Просто добавьте 777 к адресу и играйте в лучшие официальные слоты
                    </div>
                </div>
                <button className={'bt-right'} onClick={()=>this.prereload()}></button>
                </div>
            )
        }

    }

    render() {
        return (
         <>
         {this.loadin()}
         </>   
        )
    }
}

export default Preview;