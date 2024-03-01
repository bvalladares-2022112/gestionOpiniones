import { Schema, model } from 'mongoose';

const commentSchema = Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    }
}, {
    versionKey: false 
})

export default model('comment', commentSchema)