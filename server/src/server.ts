import mongoose from 'mongoose';

import app from './app';

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => app.listen(PORT, () => console.log('server started on 3000')))
  .catch((error) => console.log(error.message));
