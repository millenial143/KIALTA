import React from 'react';

class InfoPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <>
        <div className={'infoblock'}>
            <div className={'info-info'}>
                <div className={'info-header'}>Контактная информация</div>
                <div className={'info-desc'}><img src="../theme/ic2.png"></img><b>Телефон:</b> 88005553535</div>
                <div className={'info-desc info-a'}><img src="../theme/ic3.png"></img><b>Электронная почта:</b> <a href='https://vk.com/id0'> nigernigerniger@gmail.com</a> </div>
                <div className={'info-desc'}><img src="../theme/ic1.png"></img><b>Адрес:</b> Сарай с книгами</div>
                <div className={'info-desc info-a2'}> <a href='https://goo.gl/maps/gMGVnNKJFpfEa2SUA'> Aдрес на карте</a> </div>
            </div>
            <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ae3017dd2b904e343dca9e578a8be93913049378a2f06777e32bda82464ebc37a&amp;width=435&amp;height=400&amp;lang=ru_RU&amp;scroll=true"></script>
        </div>
        </>   
        )
    }
}

export default InfoPage;