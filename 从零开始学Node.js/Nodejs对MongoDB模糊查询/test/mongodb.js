const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejs', { useNewUrlParser: true, useUnifiedTopology: true });
exports.mongoose = mongoose;