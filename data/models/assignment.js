import { model, Schema } from "mongoose";

const assignmentSchema =new Schema({
    course:{
        type:Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    duedate:{
        type:Date,
        required:true
    },
    submissions: [{
        student: { type:Schema.Types.ObjectId, ref: 'User' },
        fileUrl: { type: String },
        submittedAt: { type: Date, default: Date.now }
    }]
},{
    timestamps:true,
    versionKey:false
})

export const Assignment=model("Assignment",assignmentSchema)