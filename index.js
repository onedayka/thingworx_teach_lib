'use strict';

var { ThingWorx } = require('./thingworx');

let url = 'https://pp-2105231831ae.devportal.ptc.io/Thingworx/';
let apiKey = 'c219d636-a5a1-41ff-a351-45f0603f2252';

let tw = new ThingWorx(url, apiKey);

tw.deleteThing("SomeTestThingFromRestAPI").then((data) => {
    console.log(data);
}).catch((e) => {
    console.log(e[0]);
    console.log(`Error code ${e[1]}`);
});