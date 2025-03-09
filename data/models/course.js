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
    lecture:[{
        type:Schema.Types.ObjectId,
        ref:"Lecture",
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    assignment:[{
        type:Schema.Types.ObjectId,
        ref:"Assignment"
    }]
},{
    timestamps:true,
    versionKey:false
})

courseSchema.pre(/^find/,function(){
    this.populate("professor","name")
    this.populate("lecture","title")
    this.populate("students","name")
    this.populate("assignment","title")
})

export const Course =model("Course",courseSchema)