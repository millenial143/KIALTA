import React from 'react';
import openSocket from 'socket.io-client';
import ChatPage from './../pages/ChatPage';

export const socket = openSocket('http://localhost:8000');
console.log('Подключение к серверу');

export let client = {};
export let urtheme = null;
export let roomid = null;
export let Layers = [];
export function SetTheme (t) {
    urtheme = t;
}
export function SetClient(t) {
    client = t;
}
export function AddLayer(t) {
    Layers.push(t);
}

/* Получает клиент
roomlist (Комнаты) - Отправка комнат
errorjoin (Причина) - Ошибка входа/создания комнаты
successjoin (id комнаты) - Комната создана и вход в неё реализован
successlogin (ФИО,Аватарка,Описание,Стаж,Аттестаты,Право (Нужно для прогрузки страницы админа)) - Успешная авторизация юриста и отправка данных ему
successroom (Данные комнаты) - Успешный вход
kickur (Причина) - Выход/Выкидывание юриста
msgtocnt (Сообщение) - Отправка сообщения пользователя
refme (Данные) - Обновление локальной информации о себе
*/

/* Получает сервер
createroom (Имя, Тема) - Создание комнаты клиента
loginur (Логин, Пароль) - Авторизация юриста
roomjoin (ID комнаты) - Присоединение юриста к комнате
exitroom () - Выход из комнаты
msgtosrv (Сообщение) - Получение сообщения на сервер
*/

//СООБЩЕНИЕ -> КЛИЕНТ                       (СТР ЧАТА) ChatPage.setState
export default function Socket() {}


export function resmes(){
    
}