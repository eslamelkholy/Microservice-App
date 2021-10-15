import express from 'express';
import { json } from 'body-parser';

const app = express();
const PORT = 3000;

app.use(json());

app.get('/api/users/currentUser', (req, res) => {
  return res.send('HI There it Works Fine');
});

app.listen(PORT, () => console.log(`Auth Service Listening on Port ${PORT} Test Skaffold`));
