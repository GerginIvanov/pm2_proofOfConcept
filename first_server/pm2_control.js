const pm2 = require("pm2");

function startServerTwo() {

    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.start({
            script: '../second_server/server.js',
            name: 'second server',
        }, () => {
            pm2.disconnect();
        });
    });
}

function startServerThree() {

    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.start({
            script: '../third_server/server.js',
            name: 'third server',
        }, () => {
            pm2.disconnect();
        });
    });
}

module.exports = { startServerTwo, startServerThree };