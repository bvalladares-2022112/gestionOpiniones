import { Schema, model } from 'mongoose';

const postSchema = Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false 
})

export default model('post', postSchema)