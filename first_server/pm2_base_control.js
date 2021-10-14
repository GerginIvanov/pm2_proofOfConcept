const pm2 = require("pm2");
const fs = require('fs');

function getBaseLogs() {
    fs.readFile('C:\Users/Gergi/.pm2/logs/base-server-out.log', 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }
        console.log(data);
        return data;
    });
}


module.exports = { getBaseLogs, };