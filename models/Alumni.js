import mongoose from 'mongoose';

const AlumniSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    batch: { type: String, required: true }, // e.g., "2015"
    currentRole: { type: String, required: true }, // e.g., "Software Engineer"
    company: { type: String, required: true }, // e.g., "Google"
    image: { type: String }, // URL to photo
    linkedin: { type: String },
    quote: { type: String },
    isApproved: { type: Boolean, default: false }, // Admin must approve before showing in directory
}, { timestamps: true });

export default mongoose.models.Alumni || mongoose.model('Alumni', AlumniSchema);
