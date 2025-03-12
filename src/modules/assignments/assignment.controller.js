import { Assignment } from "../../../data/models/assignment.js"
import AppError from "../../../utils/AppError.js"
import HttpText from "../../../utils/HttpText.js"
import asyncErrorHandler from "../../middlewares/asyncErrorHandler.js"



export const addAssignment = asyncErrorHandler(
    async(req,res,next)=>{

        let exists =await Assignment.findOne({title:req.body.title})

        if(exists){
            const error=AppError.create("Assignment already exist",400,HttpText.FAIL)
            return next(error)
        }

        const fileUrl = req.file.path;
            let assignment = new Assignment({
                ...req.body,
                fileUrl
        })
        await assignment.save()

        res.status(201).json({status:HttpText.SUCCESS,data:assignment})

});


export const getAllAssignment=asyncErrorHandler(async(req,res,next)=>{

    let pageNumber =req.query.page *1 || 1
    if(pageNumber<1)pageNumber=1
    let limit =4
    const skip =(parseInt(pageNumber-1))*limit

    let assignment=await Assignment.find().skip(skip).limit(limit)

    res.status(201).json({status:HttpText.SUCCESS,data:assignment})
})

export const getSpecificAssignment = asyncErrorHandler(
    async (req, res, next) => {

        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            const error = AppError.create('Assignment is not found.', 404, HttpText.FAIL);
            next(error);
        }

        res.status(200).json({
            status: HttpText.SUCCESS,
            data: {assignment}
        });

    }
)

export const updateAssignment=asyncErrorHandler(async(req,res,next)=>{
    let assignment =await Assignment.findById(req.params.id)


    if(!assignment){
        const error=AppError.create("Assignment doesnt exist",400,HttpText.FAIL)
        return next(error)
    }

    let exists =await Assignment.findOne({title:req.body.title})

    if(exists){

        const error=AppError.create("Assignment already exist",400,HttpText.FAIL)
        return next(error)
    }

    let Updated =await Assignment.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.status(201).json({status:HttpText.SUCCESS,data:Updated})
})


export const deleteAssignment =asyncErrorHandler(async(req,res,next)=>{

    let assignment =await Assignment.findByIdAndDelete(req.params.id)

    if(!assignment){
        const error=AppError.create("Assignment doesnt exist",400,HttpText.FAIL)
        return next(error)
    }

    res.status(201).json({status:HttpText.SUCCESS,data:assignment})
})