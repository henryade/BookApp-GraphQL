import express from 'express';
import { config } from 'dotenv';
import "core-js/stable";
import "regenerator-runtime/runtime";
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema/schema';

config();

mongoose.connect("mongodb+srv://adeola:adeola@firstcluster-yx8op.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.once('open', () => {
  console.log("Connected to MLab Db")
});


const { PORT } = process.env;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(PORT, () => console.log(`Server Ready at ${PORT}`))