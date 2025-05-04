import { Course } from "../../../data/models/course.js"
import asyncErrorHandler from "../../middlewares/asyncErrorHandler.js"
import AppError from "../../../utils/AppError.js"
import HttpText from "../../../utils/HttpText.js"
import { User } from "../../../data/models/user.model.js";
import { Payment } from "../../../data/models/payment.js";

export const addCourse = asyncErrorHandler(async(req,res,next)=>{

    const { title, department, hours, professor } = req.body;

    // validate course exist
    const exists = await Course.findOne({title})
    if(exists){
        const error = AppError.create("Course already exist",400,HttpText.FAIL)
        return next(error)
    }

    // Validate professor
    const profUser = await User.findById(professor);
    if (!profUser || profUser.role !== 'professor') {
        return next(AppError.create('Invalid professor ID or role', 400, HttpText.FAIL));
    }

    // Validate students (if provided)
    if (students && students.length > 0) {
        const studentUsers = await User.find({ _id: { $in: students } });
        if (studentUsers.length !== students.length || studentUsers.some(user => user.role !== 'student')) {
            return next(AppError.create('Invalid student IDs or roles', 400, HttpText.FAIL));
        }
    }

    const course = new Course({
        title,
        professor,
        department,
        hours,
        lecture: [],
        assignment: []
    });
    await course.save();

    // If students are added, update their Payment
    if (students && students.length > 0) {
        for (const studentId of students) {
            const student = await User.findById(studentId);
            let payment = await Payment.findOne({ studentId });

            if (!payment) {
                payment = new Payment({
                    studentId,
                    courses: [course._id],
                    totalFee: course.hours * 50, // Hard-coded hourly rate for now
                    hasPaid: false,
                    hourlyRate: 50
                });
            } else {
                payment.courses.push(course._id);
                payment.totalFee += course.hours * 50;
            }
            await payment.save();

            await User.updateOne(
                { _id: studentId },
                { $set: { payment: payment._id } }
            );
        }
    }

    res.status(201).json({
        status: HttpText.SUCCESS,
        data: { course }
    });
});

export const getAllCourses = asyncErrorHandler(async(req,res,next)=>{

    let pageNumber =req.query.page *1 || 1
    if(pageNumber<1)pageNumber=1
    let limit =4
    const skip =(parseInt(pageNumber-1))*limit

    let courses=await Course.find().skip(skip).limit(limit)

    res.status(201).json({status:HttpText.SUCCESS,data:courses})
});

export const getProfessorCourses = asyncErrorHandler(async(req, res, next) => {
    const courses = await Course.find({ professor: req.user.id })
        .populate('lecture', 'title')
        .populate('assignment', 'title')

    res.status(200).json({
        status: HttpText.SUCCESS,
        data: courses
    });
});

export const getSpecificCourse = asyncErrorHandler(
    async (req, res, next) => {

        const user = await User.findById(req.user.id).populate({
            path: 'payment',
            populate: {
                path: 'courses',
                populate: [
                    { path: 'lecture', select: 'title fileUrl' },
                    { path: 'assignment', select: 'title fileUrl' }
                ]
            }
        });

        const course = await Course.findById(req.params.id);
        if (!course) {
            const error = AppError.create('Course is not found.', 404, HttpText.FAIL);
            next(error);
        }

        if (!user.payment.courses.some(c => c._id.toString() === course._id.toString())) {
            return next(AppError.create('This course is not available for you.', 403, HttpText.FAIL));
        }

        res.status(200).json({
            status: HttpText.SUCCESS,
            data: {course}
        });

    }
);

export const updateCourse = asyncErrorHandler(async(req,res,next)=>{
    let course =await Course.findById(req.params.id)


    if(!course){
        const error=AppError.create("course doesnt exist",400,HttpText.FAIL)
        return next(error)
    }

    let exists =await Course.findOne({title:req.body.title})

    if(exists){

        const error=AppError.create("Course already exist",400,HttpText.FAIL)
        return next(error)
    }

    let Updated =await Course.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.status(201).json({status:HttpText.SUCCESS,data:Updated})
});

export const deleteCourse = asyncErrorHandler(async(req,res,next)=>{

    let course =await Course.findByIdAndDelete(req.params.id)

    if(!course){
        const error=AppError.create("course doesnt exist",400,HttpText.FAIL)
        return next(error)
    }

    res.status(201).json({status:HttpText.SUCCESS,data:course})
});