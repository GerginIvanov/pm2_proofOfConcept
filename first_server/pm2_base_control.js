const pm2 = require("pm2");
const fs = require('fs');


function getBaseLogs() {
    const filePath = 'C:\Users/Gergi/.pm2/logs/base-server-out.log';

    //this callback is optional and only useful if there's changes to the file
    //https://www.geeksforgeeks.org/node-js-fs-watch-method/
    fs.watch('C:\Users/Gergi/.pm2/logs/base-server-out.log', 'utf8', (eventType, filename) => {
        if (filename) {
           console.log(fs.readFileSync(filePath, "utf-8"));
        }
    });
}


module.exports = { getBaseLogs, };