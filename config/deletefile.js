const fs = require("fs");


module.exports = function removeFile(path) {
    fs.unlink(path, err => {
        if (err) {
            console.log(err)
        };
        return
    })
}