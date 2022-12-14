const multer = require('multer');
const path = require('path');

//old multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         return cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString().replace(/:/g, "-") + "-" 
//         + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg'
//         || file.mimetype === 'image/png'
//         || file.mimetype === 'image/jpg') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// module.exports = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});