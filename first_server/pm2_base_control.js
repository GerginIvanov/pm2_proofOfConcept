const fs = require('fs');
const filePath = 'C:\Users/Gergi/.pm2/logs/base-server-out.log';

function getBaseLogs() {

    // const ws = new WebSocket('ws://localhost:3000/logs');
    // ws.on('open', function open() {
    //     console.log("here");
    //     ws.send(logs);
    // });

    //this callback is optional and only useful if there's changes to the file
    //https://www.geeksforgeeks.org/node-js-fs-watch-method/
    fs.watch('C:\Users/Gergi/.pm2/logs/base-server-out.log', 'utf8', (eventType, filename) => {
        if (filename) {
            const newContents = fs.readFileSync(filePath, "utf-8");
            console.log(newContents);
        }
    });
}


module.exports = { getBaseLogs, };



//!!! we should probably clear out the logs when restarting the servers !!!///