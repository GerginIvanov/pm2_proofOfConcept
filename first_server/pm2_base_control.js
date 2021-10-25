const fs = require('fs');
const outLogs = 'C:\Users/Gergi/.pm2/logs/base-server-out.log';
const errorLogs = 'C:\Users/Gergi/.pm2/logs/base-server-error.log';

function getBaseLogs(ws) {

    fs.watch(outLogs, 'utf8', (eventType, filename) => {
        if (filename) {
            const newContents = fs.readFileSync(outLogs, "utf-8");
            console.log(newContents);
            ws.send(newContents);
        }
    });

  ws.on('close', () => {
    console.log("Client has disconnected!");
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