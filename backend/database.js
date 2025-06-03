const mongoose = require('mongoose');

const URI = 'mongodb+srv://alejandrolabradorrobles:AlexXY124356_@tabeltop.8lntwxi.mongodb.net/?retryWrites=true&w=majority&appName=TabelTop'

mongoose.connect(URI)
.then(db => console.log('DB Connected'))
.catch(err => console.error(err));

module.exports = mongoose;
