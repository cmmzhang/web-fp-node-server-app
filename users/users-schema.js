import mongoose from 'mongoose';
const usersSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    emailVisible: {type: String, enum: ['Visible in the public profile', 'Not Visible in the public profile']},
    phone: String,
    phoneVisible: {type: String, enum: ['Visible in the public profile', 'Not Visible in the public profile']},
    dob: Date,
    dobVisible: {type: String, enum: ['Visible in the public profile', 'Not Visible in the public profile']},
    type: { type: String, enum: ['PROFESSIONAL', 'STUDENT', 'ADMIN'] }
}, { collection: 'users' });
export default usersSchema;
