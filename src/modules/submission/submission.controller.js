import { Submission } from "../../../data/models/submission.js";
import AppError from "../../../utils/AppError.js";
import HttpText from "../../../utils/HttpText.js";
import asyncErrorHandler from "../../middlewares/asyncErrorHandler.js";


const addSubmission = asyncErrorHandler(
    async (req, res, next) => {

        const {assignment, fileUrl} = req.body;

        const submission = new Submission({
            student: req.user._id,
            assignment,
            fileUrl,
            status: 'submitted'
        });

        await submission.save();

        res.status(201).json({
            status: HttpText.SUCCESS,
            data: {submission}
        });

    }
);

const getAllSubmissions = asyncErrorHandler(
    async (req, res, next) => {

        const submissions = await Submission.find();

        res.status(200).json({
            status: HttpText.SUCCESS,
            data: {submissions}
        });

    }
);

const getSubmission = asyncErrorHandler(
    async (req, res, next) => {

        const submission = await Submission.findById(req.params.id);

        if (!submission) {
            const error = AppError.create('This submission is not found.', 404, HttpText.FAIL);
            return next(error);
        }

        if (
            req.user.role !== 'admin' &&
            req.user.role !== 'professor' &&
            submission.student._id.toString() !== req.user._id.toString()
        ) {
            const error = AppError.create('You do not have permission to view this submission.', 403, HttpText.FAIL);
            return next(error);
        }

        res.status(200).json({
            status: HttpText.SUCCESS,
            data: {submission}
        });

    }
);

const updateSubmission = asyncErrorHandler(
    async (req, res, next) => {

        const submission = await Submission.findById(req.params.id);

        if (!submission) {
            const error = AppError.create('This submission is not found.', 404, HttpText.FAIL);
            return next(error);
        }

        if (submission.student._id.toString() !== req.user._id.toString()) {
            const error = AppError.create('You do not have permission to view this submission.', 403, HttpText.FAIL);
            return next(error);
        }

        if (submission.assignment.duedate < Date.now()) {
            const error = AppError.create('Deadline has passed.', 400, HttpText.FAIL);
            return next(error);
        }

        const updatedSubmission = await Submission.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        res.status(200).json({
            status: HttpText.SUCCESS,
            data: updatedSubmission
        });

    }
);

const deleteSubmission = asyncErrorHandler(
    async (req, res, next) => {

        const submission = await Submission.findById(req.params.id);

        if (!submission) {
            const error = AppError.create('This submission is not found.', 404, HttpText.FAIL);
            return next(error);
        }

        const deletedSubmission = await Submission.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: HttpText.SUCCESS,
            data: null
        });

    }
);

export default {
    addSubmission,
    getAllSubmissions,
    getSubmission,
    updateSubmission,
    deleteSubmission
}