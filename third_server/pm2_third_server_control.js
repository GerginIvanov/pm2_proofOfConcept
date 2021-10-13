const pm2 = require("pm2");


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

module.exports = { startServerThree, stopServerThree, restartServerThree, };