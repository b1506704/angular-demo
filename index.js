import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'express';

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 80;

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/dist/angular-demo')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});

app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));
