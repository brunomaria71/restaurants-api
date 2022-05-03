import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// setup my routes (defining which requests are allowed)







app.listen(3000, () => {
    console.log('Listening on http://localhost:3000...');
}); 