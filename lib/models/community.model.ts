import mongooose from 'mongoose'

const communitySchema = new mongooose.Schema({
    id: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    image: String,
    bio: String,
    createdBy: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'User'
    },
    threads:[
        {
            type: mongooose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    members:[
        {
            type: mongooose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

export const Community = mongooose.models.Community || mongooose.model('Community', communitySchema);

export default Community;