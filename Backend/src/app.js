require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const session=require('express-session');
const passport= require('./controllers/passportConfig')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(cors())
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/usuarios', userRoutes);
app.use('/auth', authRoutes);


app.get('*', (req, res) => {
    res.status(404).json({mensaje:'No encontrado'});
});