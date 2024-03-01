import Comment from './comments.model.js';

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const createComment = async (req, res) => {
    try {
        let { text, post } = req.body;
        let userId = req.user.id; 
        let comment = new Comment({
            text,
            user: userId, 
            post: post 
        });
        await comment.save();
        return res.status(201).send({ message: 'Comment created successfully', comment: comment });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Comment creation error' });
    }
};


export const editComment = async (req, res) => {
    try {
        let { id } = req.params;
        let { text } = req.body;
        let userId = req.user.id; 
        let comment = await Comment.findOne({ _id: id, user: userId });
        if (!comment) {
            return res.status(404).send({ message: 'The comment either cannot be found or you are not authorized to edit it' });
        }
        comment.text = text;
        await comment.save();
        return res.send({ message: 'Comment successfully updated', comment });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Comment update error' });
    }
};


export const deleteComment = async (req, res) => {
    try {
        let { id } = req.params;
        let userId = req.user.id; 
        let comment = await Comment.findOne({ _id: id, user: userId });
        if (!comment) {
            return res.status(404).send({ message: 'The comment cannot be found, or you are not authorized to delete it' });
        }
        let deletedComment = await Comment.deleteOne({ _id: id })
        if (deletedComment.deletedCount === 0) return res.status(404).send({ message: 'Comment not found and not deleted' })
        return res.send({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Comment deletion error.' });
    }
};
