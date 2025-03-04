import { model, Schema } from "mongoose";

const courseSchema= new Schema({
    title:{ 
        type: String,
        required: true,
        trim: true 
    },
    professor:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    department:{
        type: String,
        required: true
    },
    lecture:{
        type:Schema.Types.ObjectId,
        ref:"Lecture",
    },
    student:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    assignment:{
        type:Schema.Types.ObjectId,
        ref:"Assignment"
    }
},{
    timestamps:true,
    versionKey:false
})

export const Course =model("Course",courseSchema)