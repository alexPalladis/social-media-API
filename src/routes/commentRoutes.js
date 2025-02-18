const express = require('express');
const {createComment,editComment,deleteComment,getCommentsByPost} = require('../controllers/commentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/:postId',auth,createComment);
router.put('/:id',auth,editComment);
router.delete('/:id',auth,deleteComment);
router.get('/post/:postId',getCommentsByPost);

module.exports = router;