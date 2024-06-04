const multer = require('multer');

// Set storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './photos'); // Make sure this directory exists!
    },
    filename: function(req, file, cb) {
        console.log(file.originalname)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    }
});

// Initialize upload
const upload = multer({ storage: storage });

module.exports = upload;
