import mongoose, { Schema, model, models } from 'mongoose';
import Users from './user';

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
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
    likes: [{ type: mongoose.Types.ObjectId, ref: Users }]
});

const Prompt = models.Prompts || model('Prompts', PromptSchema);

export default Prompt;