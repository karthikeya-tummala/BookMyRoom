import mongoose, { Schema } from 'mongoose';

export const USER_ROLES = {
    Admin: 'Admin',
    Employee: 'Employee',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof  USER_ROLES];

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
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.Employee,
        required: true,
    },
}, { timestamps: true }
);

export const Employee = mongoose.models.Employee || mongoose.model('Employee', userSchema);