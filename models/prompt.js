import mongoose, { Schema, model, models } from 'mongoose';
import Users from './user';

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: Users,
        required: [true, 'Tag is required.']
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: Users }],
    comments: [{
        uid: {
            type: mongoose.Types.ObjectId,
            ref: Users
        },
        comment: {
            type: String,
            required: [true, 'Comment Required']
        },
        createdAt: {
            type: String
        }
    }]
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;