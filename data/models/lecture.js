import { model, Schema } from "mongoose";


const lectureSchema= new Schema({
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
    content:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String
    },
    order:{
        type:Number,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})

export const Lecture =model("Lecture",lectureSchema)