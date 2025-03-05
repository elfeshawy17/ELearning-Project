import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { dbConnection } from './data/db.connection.js';
import HttpText from './utils/HttpText.js';
import { userRouter } from './src/modules/user/user.routes.js';
import { authRouter } from './src/modules/auth/auth.routes.js';
import courseRouter from './src/modules/courses/courses.routes.js';
import lectureRouter from './src/modules/lectures/lecture.routes.js';
import assignmentRouter from './src/modules/assignments/assignment.routes.js';
import { submissionRouter } from './src/modules/submission/submission.routes.js';


const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/course', courseRouter)
app.use('/api/lecture', lectureRouter)
app.use('/api/assignment', assignmentRouter)
app.use('/api/submission', submissionRouter)




app.all('*', (req, res, next) => {
    res.status(404).json({
        status: HttpText.ERROR,
        message: 'Route Is Not Found'
    })
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || HttpText.ERROR,
        message: error.message,
        data: null
    })
})


app.listen(port, () => console.log(`Server listening on port ${port}!`))