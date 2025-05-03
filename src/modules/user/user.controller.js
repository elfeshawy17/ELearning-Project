import { User } from './../../../data/models/user.model.js';
import AppError from '../../../utils/AppError.js';
import HttpText from '../../../utils/HttpText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';


const addUser = asyncErrorHandler(
    async (req, res, next) => {

        const user = new User(req.body);
        await user.save();

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

export default {
    addUser,
    getAllUsers,
    getSpecificUser,
    updateUser,
    deleteUser,
    getProfile,
}