const multer = require("multer");
const uuid = require('uuid').v4()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads")
    },
    filename: function (req, file, cb) {
        // cb(null, file.originalname);
        cb(null, uuid +'_'+ file.originalname);
    },
    path: function (req, file, cb) {
        cb(null, "/uploads/" + filename);
    }
});
module.exports = storage;

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        //saves a file
        cb(null, true)
    } else {
        //rejects a file
        cb(null, false);
    }
}
module.exports = fileFilter;


const uploadMulter = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5MB
    },
    fileFilter: fileFilter,
});
module.exports = uploadMulter;