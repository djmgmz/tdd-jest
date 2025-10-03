const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

PostController.update = (req, res) => {
    return PostModel.updatePost(req.params.id, req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    });
};

PostController.findPost = (req, res) => {
    return PostModel.findPostById(req.params.id, (err, post) => {
        if (err) {
            return res.status(500).end();
        }
        if (!post) {
            return res.status(404).end();
        }
        return res.json(post);
    });
};

exports.findPostById = (id, next) => {
    Post.findById(id)
        .then(post => next(null, post))
        .catch(err => next(err));
};

module.exports = PostController;