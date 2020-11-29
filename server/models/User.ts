import mongoose, {Document, Model} from 'mongoose';

const userSchema:mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    }
}, {
    timestamps: true
});

export const User: Model<Document> = mongoose.model('User', userSchema)

// export mode;
