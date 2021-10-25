const pm2 = require('pm2');
const port = 3010;


const wss = new webSocket.Server({ port });

function monitorLogs(newContents) {

    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.start({
            script: './socket_server.js',
            name: 'socket_server',
        }, (err) => {
            console.error(err);
            pm2.disconnect();
        });
    })

    wss.on('connection', ws => {
        ws.send(newContents);

        ws.on('close', () => {
            console.log("Disconneted");
        })
    });
}

module.exports = {
    monitorLogs,
}