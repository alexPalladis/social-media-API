const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async(req,res) => {
    try {
        const {title,text} = req.body;
        const post = await Post.create({title,text,userId: req.user.id});
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({error: 'Error creating post!'})
    }
};

const editPost = async(req,res) => {
    try {
        const {title,text} = req.body;
        const post = await Post.findOne({where: {id: req.params.id}});
        if(!post){
            return res.status(400).json({error: 'Post was not found!'})
        }
        if(post.userId !== req.user.id){
            return res.status(403).json({error: 'User accesss denied!'})
        }

        post.title = title;
        post.text = text;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({error: 'Error editing post!'})
    }
};

const deletePost = async(req,res) => {
    try {
        const post = await Post.findOne({where: {id: req.params.id}});
        if(!post){
            return res.status(400).json({error: 'Post was not found!'})
        }
        if(post.userId !== req.user.id){
            return res.status(403).json({error: 'User accesss denied!'})
        }

        await post.destroy();
        
        res.json({message: 'Post deleted succesfully!'})
    } catch (error) {
        res.status(500).json({error: 'Error deleting post!'})
    }
};

const getMyPosts = async(req,res) => {
    try {
        const { page = 1, limit = 10} = req.query;

        const posts= await Post.findAndCountAll({
            where: {userId: req.user.id},
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['createdAt','DESC']]
        });

        res.json({
            totalPosts: posts.count,
            totalPages: Math.ceil(posts.count / limit),
            currentPage: parseInt(page),
            posts: posts.rows
        });
    } catch (error) {
        res.status(500).json({error: 'Error fetching posts!'})
    }
};


const getUserPosts = async(req,res) => {
    try {
        const { page = 1, limit = 10} = req.query;
        const {userId} = req.params;

        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({error: 'User not found!'})
        }

        const posts= await Post.findAndCountAll({
            where: {userId},
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['createdAt','DESC']]
        });

        res.json({
            totalPosts: posts.count,
            totalPages: Math.ceil(posts.count / limit),
            currentPage: parseInt(page),
            posts: posts.rows
        });
    } catch (error) {
        res.status(500).json({error: 'Error fetching posts!'})
    }
};

const getAllPosts = async(req,res) => {
    try {
        const { page = 1, limit = 10} = req.query;
        const posts= await Post.findAndCountAll({
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['createdAt','DESC']]
        });

        res.json({
            totalPosts: posts.count,
            totalPages: Math.ceil(posts.count / limit),
            currentPage: parseInt(page),
            posts: posts.rows
        });
    } catch (error) {
        res.status(500).json({error: 'Error fetching posts!'})
    }
};


module.exports = {createPost,editPost,deletePost,getMyPosts,getUserPosts,getAllPosts};