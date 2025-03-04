import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { dbConnection } from './data/db.connection.js';
import HttpText from './utils/HttpText.js';
import { userRouter } from './src/modules/user/user.routes.js';


const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);



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