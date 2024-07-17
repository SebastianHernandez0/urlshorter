const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(cors())

app.use('/usuarios', userRoutes);


app.get('*', (req, res) => {
    res.status(404).json({mensaje:'No encontrado'});
});