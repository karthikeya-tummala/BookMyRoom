import mongoose, { Schema } from 'mongoose';

enum UserRole {
    Admin = 'Admin',
    Employee = 'Employee',
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid Email format'],
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.Employee,
        required: true,
    },
}, { timestamps: true }
);

export const Employee = mongoose.models.Employee || mongoose.model('Employee', userSchema);