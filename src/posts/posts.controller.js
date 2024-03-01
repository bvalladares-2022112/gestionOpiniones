import Post from './posts.model.js';

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const createPost = async (req, res) => {
    try {
        let { title, category, content } = req.body;
        let userId = req.user.id; 
        let post = new Post({
            title,
            category,
            content,
            user: userId 
        });
        await post.save();
        return res.status(201).send({ message: 'Post created successfully', post: post });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Post creation error' });
    }
};


export const editPost = async (req, res) => {
    try {
        let { id } = req.params;
        let { title, category, content } = req.body;
        let userId = req.user.id; 
        let post = await Post.findOne({ _id: id, user: userId });
        if (!post) {
            return res.status(404).send({ message: 'The post cannot be found, or you are not authorized to edit it' });
        }
        post.title = title;
        post.category = category;
        post.content = content;

        await post.save();
        return res.send({ message: 'Post successfully updated.', post });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Post update error.' });
    }
};


export const deletePost = async (req, res) => {
    try {
        let { id } = req.params;
        let userId = req.user.id; 
        let post = await Post.findOne({ _id: id, user: userId });
        if (!post) {
            return res.status(404).send({ message: 'The post cannot be found, or you are not authorized to delete it.' });
        }
        let deletedPost = await Post.deleteOne({ _id: id })
        if (deletedPost.deletedCount === 0) return res.status(404).send({ message: 'Post not found and not deleted' })       
        return res.send({ message: 'Post successfully deleted.' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting post' });
    }
};
