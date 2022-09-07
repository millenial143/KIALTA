import React from 'react';
import {SetTheme} from './../functions/Socket';

class StartPage extends React.Component {
    constructor(props) {
        super(props);
    }

    

    openneed(id) {

    }

    themesel(t) {
        SetTheme(t);
        window.location.hash='ClientJoin';
    }

    render() {
        return (
         <>

            <div className={'consult-block'}>
                <div className={'black-header'} onClick={()=>this.themesel('Сфера гражданского права')}>
                    <img src={'https://www.practicepanther.com/wp-content/uploads/2016/06/Types-of-legal-firms.png'} className={'black-pic'}></img>
                    <div className={'black-headtext'} > <p>Сфера гражданского права</p></div>
                </div>
                <div className={'black-under'} id='0'>

                </div>
            </div>
            <div className={'consult-block'}>
                <div className={'black-header'} onClick={()=>this.themesel('Жилищные дела')}>
                    <img src={'https://banner2.cleanpng.com/20180323/ycq/kisspng-housing-computer-icons-building-house-business-building-5ab593c7415ed4.1649397615218492872678.jpg'} className={'black-pic'}></img>
                    <div className={'black-headtext'} > <p>Жилищные дела</p></div>
                </div>
                <div className={'black-under'} id='0'>

                </div>
            </div> <div className={'consult-block'}>
                <div className={'black-header'} onClick={()=>this.themesel('Семейные споры')}>
                    <img src={'https://tspon.ru/images/fam.gif'} className={'black-pic'}></img>
                    <div className={'black-headtext'}> <p>Семейные споры</p></div>
                </div>
                <div className={'black-under'} id='0'>

                </div>
            </div> <div className={'consult-block'}>
                <div className={'black-header'} onClick={()=>this.themesel('Банкротство физических и юридических лиц')}>
                    <img src={'https://img2.freepng.ru/20180409/dce/kisspng-lawyer-family-law-mediation-criminal-law-gst-5acb34e8f296c2.0186603115232667929937.jpg'} className={'black-pic'}></img>
                    <div className={'black-headtext'} > <p>Банкротство физических и<br/> юридических лиц</p></div>
                </div>
                <div className={'black-under'} id='0'>

                </div>
            </div> <div className={'consult-block'}>
                <div className={'black-header'} onClick={()=>this.themesel('Разъяснение документов')}>
                    <img src={'https://static.vecteezy.com/system/resources/previews/000/421/815/original/vector-documents-icon.jpg'} className={'black-pic'}></img>
                    <div className={'black-headtext'} > <p>Разъяснение документов</p></div>
                </div>
                <div className={'black-under'} id='0'>

                </div>
            </div> <div className={'consult-block'}>
                <div className={'black-header'} onClick={()=>this.themesel('Сфера предпринимательского права')}>
                    <img src={'https://img2.freepng.ru/20190319/ott/kisspng-computer-icons-vector-graphics-stock-illustration-wir-bieten-ihnen-die-komplettlsung-in-der-bav-5c909d5dd40e66.8866106815529813418686.jpg'} className={'black-pic'}></img>
                    <div className={'black-headtext'} > <p>Сфера предпринимательского права</p></div>
                </div>
                <div className={'black-under'} id='0'>

                </div>
            </div> <div className={'consult-block'}>
                <div className={'black-header'} onClick={()=>this.themesel('Консультации по вопросам регистрации юридических лиц')}>
                    <img src={'https://www.clipartmax.com/png/full/112-1123853_group-demos-access-user-icon.png'} className={'black-pic'}></img>
                    <div className={'black-headtext'} > <p>Консультации по вопросам регистрации<br/>юридических лиц</p>
                    </div>
                </div>
                <div className={'black-under'} id='0'>

                </div>
            </div> <div className={'consult-block'}>
                <div className={'black-header'} onClick={()=>this.themesel('Сопровождение деятельности организаций')}>
                    <img src={'https://json.tv/images/general/2014/08/29/20140829141200-4119.jpg'} className={'black-pic'}></img>
                    <div className={'black-headtext'} > <p>Сопровождение деятельности<br/> организаций</p></div>
                </div>
                <div className={'black-under'} id='0'>

                </div>
            </div> <div className={'consult-block'}>
                <div className={'black-header'} onClick={()=>this.themesel('Сфера административного права')}>
                    <img src={'https://rusonar.ru/images/leadership-icon-blue-460x460.png'} className={'black-pic'}></img>
                    <div className={'black-headtext'} > <p>Сфера административного права</p></div>
                </div>
                <div className={'black-under'} id='0'>

                </div>
            </div>
    

         </>   
        )
    }
}

export default StartPage;