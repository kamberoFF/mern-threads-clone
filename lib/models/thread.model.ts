import mongooose from 'mongoose'

const threadSchema = new mongooose.Schema({
    text: {type: String, required: true},
    author: {type: mongooose.Schema.Types.ObjectId, ref: 'User', required: true},
    community : {type: mongooose.Schema.Types.ObjectId, ref: 'Community'},
    createdAt: {type: Date, default: Date.now},
    parentId: {type: String},
    children: [{type: mongooose.Schema.Types.ObjectId, ref: 'Thread'}],
    likes: [{type: String}]
});

export const Thread = mongooose.models.Thread || mongooose.model('Thread', threadSchema);

export default Thread;