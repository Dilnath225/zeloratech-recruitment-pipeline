const express = require('express');
const cors = require('cors');
const candidateRoutes = require('./routes/candidateRoutes');

//createthe main server and the put miidleware for the server
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/candidates', candidateRoutes);


//to start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
