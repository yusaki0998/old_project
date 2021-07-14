const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const MovieController = require('../bl/movie-controller');

router.post('/', checkAuth, upload.single('coverImage'), MovieController.createMovie);
router.get('/ongoing', MovieController.getOngoingMovies);
router.get('/comingsoon', MovieController.getComingSoonMovies);
router.get('/:movieId', MovieController.getMovie);
router.put('/:movieId', checkAuth, upload.single('coverImage'), MovieController.updateMovie);
router.delete('/:movieId', checkAuth, MovieController.deleteMovie);
router.post('/search', MovieController.search);

module.exports = router;