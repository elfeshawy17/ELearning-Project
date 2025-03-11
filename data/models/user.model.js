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
        minlength: 8,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value);
            },
            message: 'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
        }
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


userSchema.pre('save', function(){

    this.password = bcrypt.hashSync(this.password, 8);

});

userSchema.pre('findOneAndUpdate', function() {
    if (this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, 8);
    }
});


export const User = mongoose.model('User', userSchema);