const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const upload = require('../utils/multer');

const MovieController = require('../bl/movie-controller');

router.post('/', checkAuth, upload.single('coverImage'), MovieController.createMovie);
router.get('/ongoing', MovieController.getOngoingMovies);
router.get('/comingsoon', MovieController.getComingSoonMovies);
router.get('/:movieId', MovieController.getMovie);
router.put('/:movieId', checkAuth, upload.single('coverImage'), MovieController.updateMovie);
router.delete('/:movieId', checkAuth, MovieController.deleteMovie);
router.post('/search', MovieController.search);

module.exports = router;