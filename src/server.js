require('dotenv').config({path: __dirname + '/../.env'});
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const {sequelize} = require('./config/database');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users',userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => console.log(`Connected to DB and Server listening on port ${process.env.PORT}...`));
});