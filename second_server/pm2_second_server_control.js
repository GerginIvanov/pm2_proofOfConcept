const pm2 = require('pm2');
const fs = require('fs');
const outLogs = 'C:\Users/Gergi/.pm2/logs/second-server-out.log';
const errorLogs = 'C:\Users/Gergi/.pm2/logs/second-server-error.log';

function startServerTwo() {
    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.start({
            script: '../second_server/server.js',
            name: 'second_server',
        }, (err) => {
            console.error(err);
            pm2.disconnect();
        });
    });
}

function stopServerTwo() {
    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.stop('second_server', (err) => {
            console.error(err);
            pm2.disconnect();
        });
    });
}

function restartServerTwo() {
    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.restart('second_server', (err) => {
            console.error(err);
            pm2.disconnect();
        });
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
    startServerTwo,
    stopServerTwo,
    restartServerTwo,
    deleteOutLogs,
    deleteErrorLogs,
};