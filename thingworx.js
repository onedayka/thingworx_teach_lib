'use strict';

const axios = require('axios');

class ThingWorx {

    constructor (url, apiKey) {
        this.url = url;
        this.appKey = apiKey;
    }

    /**
     * Метод получение списка всех вещей из сервера.
     * 
     * @returns Массив из всех вещей (даже системных) на запущенном сервере
     */
    getThingList() {
        //На промисах по привычке...
        return new Promise((resolve, reject) => {
            let method = 'Things' + '?appKey=' + this.appKey;
            let url = this.url + method;

            //Данный метод работает через GET запрос поэтому используется axios.get
            axios.get(url, null, {
                headers: {
                    'accept': 'application/json',
                }
            })
            .then((response) => {
                //Передача ответа сервера.
                resolve(response.data);
            })
            .catch((err) => {
                //Передача данных по ошибке и кода ответа сервера.
                reject([err.response.data, err.response.status]);
            });
        });
    }

    /**
     * Метод получение конкретной вещи с сервера по названию.
     * 
     * @returns Массив из всех данных по запрошенной вещи (некоторые даже знать не особо обязательно).
     */
    getSpecificThing(thing_name) {

        return new Promise((resolve, reject) => {

            let method = `Things/${thing_name}` + '?appKey=' + this.appKey;
            let url = this.url + method;

            //Данный метод работает через GET запрос поэтому используется axios.get
            axios.get(url, null, {
                headers: {
                    'accept': 'application/json',
                }
            })
            .then((response) => {
                //Передача ответа сервера.
                resolve(response.data);
            })
            .catch((err) => {
                //Передача данных по ошибке и кода ответа сервера.
                reject([err.response.data, err.response.status]);
            });

        });
    }

    /**
     * Метод создания новой вещи с шаблоном. 
     * Шаблон явзяется обязательным при создании, используется самый дефолтный - GenericThing
     * 
     * @returns Массив из всех данных по запрошенной вещи (некоторые даже знать не особо обязательно).
     */
    createNewThing(thingName) {

        //Минимально необходимые параметры для создания вещи.
        let data = {
            "name": thingName,
            "thingTemplateName": "GenericThing"
        };

        return new Promise((resolve, reject) => {

            let method = "Resources/EntityServices/Services/CreateThing";
            let url = this.url + method + '?appKey=' + this.appKey;

            //Данный метод работает через POST запрос поэтому используется axios.post
            axios.post(url, data, {
                headers: {
                    'accept': 'application/json',
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                //Ответом, который подразумевает, что всё прошло успешно является статсу-код: 200
                resolve(response.status);
            })
            .catch((err) => {
                //Передача данных по ошибке и кода ответа сервера.
                reject([err.response.data, err.response.status]);
            });

        });
        
    }

    /**
     * Добавление свойства к заданной вещи.
     * 
     * @returns статус код операции.
     */
    createThingProperties(thingName, thingPropName) {

        //Минимально необходимые параметры для создания вещи.
        let data = {
            "name" : thingPropName,
            "type" : "NUMBER"
        };

        return new Promise((resolve, reject) => {

            let method = "Things/" + thingName + "/Services/AddPropertyDefinition";
            let url = this.url + method + '?appKey=' + this.appKey;

            //Данный метод работает через POST запрос поэтому используется axios.post
            axios.post(url, data, {
                headers: {
                    'accept': 'application/json',
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                //Ответом, который подразумевает, что всё прошло успешно является статсу-код: 200
                resolve(response.status);
            })
            .catch((err) => {
                //Передача данных по ошибке и кода ответа сервера.
                reject([err.response.data, err.response.status]);
            });

        });
    }

    /**
     * Установка значения к свойству к заданной вещи.
     * 
     * @returns статус код операции.
     */
    setPropertiesValue(thing_name, prop_name, value) {

        let data = {};
        data[prop_name] = value;

        return new Promise((resolve, reject) => {

            let method = `Things/${thing_name}/Properties/${prop_name}`;
            let url = this.url + method + '?appKey=' + this.appKey;

            //Данный метод работает через PUT запрос поэтому используется axios.put
            axios.put(url, data, {
                headers: {
                    'accept': 'application/json',
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                //Ответом, который подразумевает, что всё прошло успешно является статсу-код: 200
                resolve(response.status);
            })
            .catch((err) => {
                //Передача данных по ошибке и кода ответа сервера.
                reject([err.response.data, err.response.status]);
            });

        });
    }

    /**
     * Получение актуального значения свойства в вещи.
     * 
     * @returns json с кучей вложений и итоговым значением.
     */
    getLastPropertiesValue(thing_name, prop_name) {

        return new Promise((resolve, reject) => {

            let method = `Things/${thing_name}/Properties/${prop_name}`;
            let url = this.url + method + '?appKey=' + this.appKey;

            //Данный метод работает через GET запрос поэтому используется axios.GET
            axios.get(url, null, {
                headers: {
                    'accept': 'application/json',
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                //Передача ответа сервера.
                resolve(response.data);
            })
            .catch((err) => {
                //Передача данных по ошибке и кода ответа сервера.
                reject([err.response.data, err.response.status]);
            });

        });
    }

    /**
     * Удаление вещи по названию. 
     * 
     * @returns статус код операции.
     */
    deleteThing(thing_name) {

        return new Promise((resolve, reject) => {

            let method = "Things/" + thing_name;
            let url = this.url + method + '?appKey=' + this.appKey;

            //Данный метод работает через DELETE запрос поэтому используется axios.delete
            axios.delete(url, {
                headers: {
                    'accept': 'application/json',
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                //Ответом, который подразумевает, что всё прошло успешно является статсу-код: 200
                resolve(response.status);
            })
            .catch((err) => {
                //Передача данных по ошибке и кода ответа сервера.
                reject([err.response.data, err.response.status]);
            });

        });
    }

}

module.exports.ThingWorx = ThingWorx;