import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }],
    totalFee: {
        type: Number,
        required: true,
        min: 0
    },
    hasPaid: {
        type: Boolean,
        default: false
    },
    hourlyRate: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Payment = model("Payment", paymentSchema);