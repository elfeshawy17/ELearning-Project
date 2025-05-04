import { User } from './../../../data/models/user.model.js';
import AppError from '../../../utils/AppError.js';
import HttpText from '../../../utils/HttpText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import { Course } from '../../../data/models/course.js';


const addUser = asyncErrorHandler(
    async (req, res, next) => {

        const user = new User(req.body);
        await user.save();

        if (user.role === 'admin'){
            if (user.department !== 'IT') {
                user.department = 'IT';
            }
        }

        res.status(201).json({
            status: HttpText.SUCCESS,
            data: {user}
        })

    }
);

const getAllUsers = asyncErrorHandler(
    async (req, res, next) => {

        const pageNumber = req.query.page *1 || 1;
        if (pageNumber < 1) pageNumber = 1;
        const limit = req.query.limit || 4;
        const skip = parseInt(pageNumber -1) * limit;

        const users = await User.find().limit(limit).skip(skip);

        res.status(200).json({
            status: HttpText.SUCCESS,
            data: {users}
        })

    }
);

const getSpecificUser = asyncErrorHandler(
    async (req, res, next) => {

        const user = await User.findById(req.params.id);

        if (!user) {
            const error = AppError.create('User is not found', 404, HttpText.FAIL);
            return next(error); 
        }

        res.status(200).json({
            status: HttpText.SUCCESS,
            data: {user}
        });

    }
);

const updateUser = asyncErrorHandler(
    async (req, res, next) => {

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!user) {
            const error = AppError.create('User is not found', 404, HttpText.FAIL);
            return next(error); 
        }

        res.status(200).json({
            status: HttpText.SUCCESS,
            data: {user}
        });

    }
);

const deleteUser = asyncErrorHandler(
    async (req, res, next) => {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            const error = AppError.create('User is not found', 404, HttpText.FAIL);
            return next(error); 
        }

        res.status(200).json({
            status: HttpText.SUCCESS,
        });

    }
);

const getProfile = asyncErrorHandler(
    async (req, res, next) => {

    const user = await User.findById(req.user.id).select('name email academicId department level role');
    if (!user) {
        const error = AppError.create('User is not found', 404, HttpText.FAIL);
        return next(error);
    }

    const profileData = {
        name: user.name,
        email: user.email,
        dept: user.department,
    };

    if (user.role === 'student') {
        profileData.id = user.academicId;
        profileData.level = user.level;
    }

    res.status(200).json({
        status: HttpText.SUCCESS,
        data: profileData
    });
});

const getUserCourses = asyncErrorHandler(
    async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        status: HttpText.SUCCESS,
        data: user.courses
    });
});

const enrollCourse = asyncErrorHandler(
    async (req, res, next) => {

        const { courses } = req.body;
        const coursesExist = await Course.find({ _id: { $in: courses } });
        if (coursesExist.length !== courses.length) {
            return res.status(400).json({ message: 'One or more course IDs are invalid' });
        }

        const student = await User.findById(req.params.id);
        if (!student) {
            const error = AppError.create('Student is not found', 404, HttpText.FAIL);
            return next(error); 
        }
        if (student.role !== 'student') {
            const error = AppError.create('User is not a student', 403, HttpText.FAIL);
            return next(error); 
        }

        const updatedStudent = await User.updateOne(
            { _id: req.params.id }, // فلتر لتحديد الطالب
            { $addToSet: { courses: { $each: courses } } } // إضافة الكورسات بدون تكرار
        );

        // التحقق من نجاح التحديث
        if (updatedStudent.modifiedCount === 0) {
            const error = AppError.create('Failed to enroll courses', 500, HttpText.FAIL);
            return next(error);
        }

        // جلب بيانات الطالب المحدثة للـ response
        const updatedStudentData = await User.findById(req.params.id).select('_id courses');

        res.status(200).json({
            message: 'Courses enrolled successfully',
            student: {
                _id: updatedStudentData._id,
                courses: updatedStudentData.courses,
            },
        });
});

const getStates = asyncErrorHandler(
    async (req, res, next) => {

        const studentsCount = await User.countDocuments({ role: "student" });
        const professorsCount = await User.countDocuments({ role: "professor" });
        const adminsCount = await User.countDocuments({ role: "admin" });

        res.status(200).json({
            studentsCount,
            professorsCount,
            adminsCount
    });

});

export default {
    addUser,
    getAllUsers,
    getSpecificUser,
    updateUser,
    deleteUser,
    getProfile,
    getUserCourses,
    enrollCourse,
    getStates
}