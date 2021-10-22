const fs = require('fs');
const outLogs = 'C:\Users/Gergi/.pm2/logs/base-server-out.log';
const errorLogs = 'C:\Users/Gergi/.pm2/logs/base-server-error.log';

function getBaseLogs() {
    //this callback is optional and only useful if there's changes to the file
    //https://www.geeksforgeeks.org/node-js-fs-watch-method/
    fs.watch(outLogs, 'utf8', (eventType, filename) => {
        if (filename) {
            const newContents = fs.readFileSync(outLogs, "utf-8");
            console.log(newContents);
        }
    });
}

function deleteOutLogs() {
    fs.truncate(outLogs, 0, () => {
        console.log('Server out logs deleted!');
    });
}

function deleteErrorLogs() {
    fs.truncate(errorLogs, 0, () => {
        console.log('Error logs deleted!');
    });
}

module.exports = {
    getBaseLogs,
    deleteOutLogs,
    deleteErrorLogs,
};
