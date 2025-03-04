import { Lecture } from "../../../data/models/lecture.js";
import AppError from "../../../utils/AppError.js";
import HttpText from "../../../utils/HttpText.js";
import asyncErrorHandler from "../../middlewares/asyncErrorHandler.js";


export const addLecture=asyncErrorHandler(async(req,res,next)=>{
    let exists =await Lecture.findOne({title:req.body.title})

    if(exists){

        const error=AppError.create("Lecture already exist",400,HttpText.FAIL)
        return next(error)
    }

    let lecture=new Lecture(req.body)
    lecture.save()

    res.status(201).json({status:HttpText.SUCCESS,data:lecture})
})


export const getAllLecture=asyncErrorHandler(async(req,res,next)=>{

    let lecture=await Lecture.find()

    res.status(201).json({status:HttpText.SUCCESS,data:lecture})
})


export const updateLecture=asyncErrorHandler(async(req,res,next)=>{
    let lecture =await Lecture.findById(req.params.id)


    if(!lecture){
        const error=AppError.create("Lecture doesnt exist",400,HttpText.FAIL)
        return next(error)
    }

    let exists =await Lecture.findOne({title:req.body.title})

    if(exists){

        const error=AppError.create("Lecture already exist",400,HttpText.FAIL)
        return next(error)
    }

    let Updated =await Lecture.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.status(201).json({status:HttpText.SUCCESS,data:Updated})
})


export const deleteLecture =asyncErrorHandler(async(req,res,next)=>{

    let lecture =await Lecture.findByIdAndDelete(req.params.id)

    if(!lecture){
        const error=AppError.create("Lecture doesnt exist",400,HttpText.FAIL)
        return next(error)
    }

    res.status(201).json({status:HttpText.SUCCESS,data:lecture})
})