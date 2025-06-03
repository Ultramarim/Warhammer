const express = require('express');
const moongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const tableRoutes = require('./routes/table');

const app = express();
app.use(cors()); // añadir para que funcione la api y abra los puertos
const port = process.env.PORT || 3000;


//middleware
app.use(express.json());
app.use('/api', tableRoutes);


//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
});

//connect to mongoDB
moongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));



app.listen(port, () => console.log('Server is running on port', port));
