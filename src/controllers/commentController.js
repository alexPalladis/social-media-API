const Comment = require('../models/Comment');

const createComment = async(req,res) => {
    try {
        const {text} = req.body;
        const {postId} = req.params;
        const comment = await Comment.create({text,postId,userId: req.user.id});
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({error: 'Error creating comment!'});
    }
};

const editComment = async(req,res) => {
    try {
        const {text} = req.body;
        const comment = await Comment.findOne({where: {id: req.params.id}});
        if(!comment){
            return res.status(400).json({error: 'Comment was not found!'})
        }
        if(comment.userId !== req.user.id){
            return res.status(403).json({error: 'User accesss denied!'})
        }

        comment.text = text;
        await comment.save();

        res.json(comment);
    } catch (error) {
        res.status(500).json({error: 'Error editing comment!'})
    }
};

const deleteComment = async(req,res) => {
    try {
        const comment = await Comment.findOne({where: {id: req.params.id}});
        if(!comment){
            return res.status(400).json({error: 'Comment was not found!'})
        }
        if(comment.userId !== req.user.id){
            return res.status(403).json({error: 'User accesss denied!'})
        }

        await comment.destroy();

        res.json({message: 'Comment deleted successfully!'})
    } catch (error) {
        res.status(500).json({error: 'Error deleting comment!'})
    }
};

const getCommentsByPost = async(req,res) => {
    try {
        const {postId} = req.params;
        const { page = 1, limit = 10} = req.query;

        const comments = await Comment.findAndCountAll({
            where: {postId},
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['createdAt','DESC']]
        });

        res.json({
            totalComments: comments.count,
            totalPages: Math.ceil(comments.count / limit),
            currentPage: parseInt(page),
            comments: comments.rows
        });
    } catch (error) {
        res.status(500).json({error: 'Error fetching comments!'})
    }
};

module.exports = {createComment,editComment,deleteComment,getCommentsByPost};