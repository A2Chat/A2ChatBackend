const { getData } = require('./src/utils/osUtils.js')

//server set up
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// Configure CORS options
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = ['https://a2chat.mooo.com']; // List of allowed origins
        if (!origin || allowedOrigins.includes(origin)) {
            console.log("allowed by cors");
            callback(null, true); // Allow request
        } else {
            console.log("not allowed by cors");
            callback(new Error('Not allowed by CORS')); // Block request
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Trust the proxy for accurate IP tracking
app.set('trust proxy', true);

//sets and use 
app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors(corsOptions));

//importing route files 
const authRouter = require('./src/routes/authRoutes.js')
const firestore = require('./src/routes/firestoreRoutes.js')
const systemData = require('./src/routes/systemDataRoutes.js')
const messages = require('./src/routes/messageRoutes.js')
const userBatch = require('./src/routes/userBatchRoutes.js')

//use the routers 
app.use('/auth', authRouter)
app.use('/firestore', firestore)
app.use('/systemData', systemData)
app.use('/messages', messages)
app.use('/batch', userBatch)

//root page 
app.get('/', async(req, res) => {
    let data = await getData()
    console.log(data)
    res.render('index', data)
    console.log('CORS enabled!');
})

// Start the server
app.listen(port, () => {
    console.log(`App running listening on port ${port}`);
});
