import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();
const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      res.status(400).send({ error: "malformatted parameters" });
      return;
    }

    const bmi = calculateBmi(height, weight);

    res.send({ weight, height, bmi })
  } catch (e: unknown) {
    res.status(400).send('Sorry, there\'s an error calculating the BMI!');
    if (e instanceof Error) console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
