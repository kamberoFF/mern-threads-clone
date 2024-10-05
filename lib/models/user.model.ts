import mongooose from 'mongoose'

const userSchema = new mongooose.Schema({
    id: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    image: String,
    bio: String,
    threads:[
        {
            type: mongooose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    onboarded: {type: Boolean, default: false},
    communities:[
        {
            type: mongooose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]
});

export const User = mongooose.models.User || mongooose.model('User', userSchema);

export default User;