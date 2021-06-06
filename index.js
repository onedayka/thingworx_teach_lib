'use strict';

var { ThingWorx } = require('./thingworx');

//Адрес подключения к серверу
let url = 'https://pp-2105231831ae.devportal.ptc.io/Thingworx/';

//Созданный API ключа
let apiKey = 'c219d636-a5a1-41ff-a351-45f0603f2252';

//Создание экземпляра класса для подключения к API
let tw = new ThingWorx(url, apiKey);

//===============================
//
// Пример использования методов
//
//===============================

//Создание вещи
//После создания необходимо активировать её на сервере ThingWorx самостоятельно (через веб интерфейс, не через API)
let creatingThingName = "SomeTestThingFromRestAPI";

tw.createNewThing(creatingThingName).then((data) => {
    console.log(data);
}).catch((e) => {
    console.log(e[0]);
    console.log(`Error code ${e[1]}`);
});

//===============================

//Получение данных о конкретной вещи с сервера
let thingName = "SomeTestThingFromRestAPI";

tw.getSpecificThing(thingName).then((data) => {
    console.log(data);
}).catch((e) => {
    console.log(e[0]);
    console.log(`Error code ${e[1]}`);
});

//===============================

//Создание свойства у вещи
let createdThingName = "SomeTestThingFromRestAPI";
let newPropertyName = "SomeTestPropertyFromRestAPI";

tw.createThingProperties(createdThingName, newPropertyName).then((data) => {
    console.log(data);
}).catch((e) => {
    console.log(e[0]);
    console.log(`Error code ${e[1]}`);
});

//===============================

//Установка значения в свойство вещи
let thingName = "SomeTestThingFromRestAPI";
let propertyName = "SomeTestPropertyFromRestAPI";
let value = "12.3";

tw.setPropertiesValue(thingName, newPropertyName, value).then((data) => {
    console.log(data);
}).catch((e) => {
    console.log(e[0]);
    console.log(`Error code ${e[1]}`);
});

//===============================

//Получение актуального значения свойства вещи
let getThingName = "SomeTestThingFromRestAPI";
let getPropertyName = "SomeTestPropertyFromRestAPI";

tw.getLastPropertiesValue(getThingName, getPropertyName).then((data) => {
    console.log(data);
}).catch((e) => {
    console.log(e[0]);
    console.log(`Error code ${e[1]}`);
});

//===============================

//Удаление вещи
let deleteThingName = "SomeTestThingFromRestAPI";

tw.deleteThing(deleteThingName).then((data) => {
    console.log(data);
}).catch((e) => {
    console.log(e[0]);
    console.log(`Error code ${e[1]}`);
});