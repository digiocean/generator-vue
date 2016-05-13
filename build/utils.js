var path = require('path')
var config = require('../config')
var ifaces = require("os").networkInterfaces()

exports.assetsPath = function(_path) {
    return path.posix.join(config.build.assetsSubDirectory, _path)
}


/**
 * 获取本机ip地址
 */
exports.ip = getIp()


function getIp() {
    var ip = "127.0.0.1"

    for (var dev in ifaces) {
        var alias = 0

        ifaces[dev].forEach(function(details) {
            if (details.family == 'IPv4' && details.address !== '127.0.0.1') {
                //console.log(dev + (alias ? ':' + alias : ''), details.address)
                ip = details.address
                alias++
            }
        })
    }
    return ip
}
