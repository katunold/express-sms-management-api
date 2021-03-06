import app from './express';
import dotenv from 'dotenv';
import { appRoutes } from "./routes";
import db from './models';

dotenv.config();


const PORT = process.env.PORT;

//Test DB connection
if (process.env.NODE_ENV === 'dev') {
    db.sequelize.authenticate()
      .then(()=> {
          console.log(`successfully connected to the ${process.env.DB_DEV_NAME} `);
          db.sequelize.sync({ force: true, logging: false})}
      )
      .catch(err=>console.log('Error' + err));
}

// All routes
app.use('/api/v1', appRoutes());
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({error : `${err.name} :  ${err.message}`})
    }
    next();
});

app.server = app.listen(PORT, ()=>console.log(`server has started on port ${PORT}`));

export default app;
