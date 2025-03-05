import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    department: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'professor', 'admin'],
        default: 'student'
    },
    passwordChangedAt: Date,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, {
    timestamps: true,
    versionKey: false
});


userSchema.pre('save', function(next){
    if (this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

userSchema.pre('findOneAndUpdate', function() {
    if (this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, 8);
    }
});


export const User = mongoose.model('User', userSchema);