import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    position: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    skills: {
        type: [String],
        required: true
    },
    website: {
        type: String
    },
    bio: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        github: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
    },
}, {
    timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
