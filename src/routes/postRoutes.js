const express = require('express');
const {
    createPost,
    editPost,
    deletePost,
    getMyPosts,
    getUserPosts,
    getAllPosts
} = require('../controllers/postController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/',auth,createPost);
router.put('/:id',auth,editPost);
router.delete('/:id',auth,deletePost);
router.get('/my-posts',auth,getMyPosts);
router.get('/user/:userId',getUserPosts);
router.get('/',getAllPosts);

module.exports = router;
