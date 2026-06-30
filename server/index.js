let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const enquiryRoutes = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;
const DBURL = process.env.DBURL || 'mongodb://127.0.0.1:27017/enquirydb';

//routes
app.use('/api/website/enquiry', enquiryRoutes);

mongoose.connect(DBURL).then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Database connection failed", err);
});



    

