import app from '../app';

import { sequelize } from '../app/models/index';

const PORT = process.env.PORT || 3333;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error on database, ${err}.`);
  });
