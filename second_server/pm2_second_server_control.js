const pm2 = require('pm2');

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
        }
        );
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
        }
        );
    });
}

module.exports = { startServerTwo, stopServerTwo, restartServerTwo, };