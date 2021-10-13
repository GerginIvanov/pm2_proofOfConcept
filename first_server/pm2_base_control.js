const pm2 = require("pm2");

function getBaseLogs() {

    pm2.reload()
}

module.export = {getBaseLogs};