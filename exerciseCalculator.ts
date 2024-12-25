interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const calculateExercises = (dailyExerciseHours: number[], targetExerciseHour: number): ExerciseResult => {
  dailyExerciseHours.forEach((hour) => {
    if (hour < 0) throw new Error('exercise hour cannot be negative');
    if (hour > 24) throw new Error('maximum hours in a day is 24');
  });

  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hour) => hour > 0).length;

  const success = (trainingDays == periodLength) 
    && dailyExerciseHours.every((hour) => (hour >= targetExerciseHour));
  
  const sumExerciseHours = dailyExerciseHours.reduce(((acc, hour) => acc + hour), 0);
  const average = sumExerciseHours / periodLength;

  const sumTargetHoursInPeriod = targetExerciseHour * periodLength;
  const dailyPerTargetPercentage = (sumExerciseHours / sumTargetHoursInPeriod) * 100;

  let rating: number;
  let ratingDescription: string;

  if (dailyPerTargetPercentage >= 100) {
    rating = 3;
    ratingDescription = 'you good brother? where is the dedication?';
  } else if (dailyPerTargetPercentage >= 66) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (dailyPerTargetPercentage >= 0) {
    rating = 1;
    ratingDescription = 'feels good brother? keep it up you do good';
  } else {
    throw new Error('unable to set rating for this exercise hours dataset');
  };

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetExerciseHour,
    average
  }
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong'
  
  if (error instanceof Error) {
    errorMessage = `${errorMessage}: ${error.message}`;
  }
  
  console.log(errorMessage);
}
