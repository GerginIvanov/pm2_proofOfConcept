const pm2 = require("pm2");
const fs = require('fs');
const outLogs = 'C:\Users/Gergi/.pm2/logs/third-server-out.log';
const errorLogs = 'C:\Users/Gergi/.pm2/logs/third-server-error.log';

function startServerThree() {

    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.start({
            script: '../third_server/server.js',
            name: 'third_server',
        }, (err) => {
            console.error(err);
            pm2.disconnect();
        });
    });
}

function stopServerThree() {
    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.stop('third_server', (err) => {
            console.error(err);
            pm2.disconnect();
        }
        );
    });
}

function restartServerThree() {
    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.restart('third_server', (err) => {
            console.error(err);
            pm2.disconnect();
        }
        );
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
    startServerThree,
    stopServerThree,
    restartServerThree,
    deleteOutLogs,
    deleteErrorLogs,
};