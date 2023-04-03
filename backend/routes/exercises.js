const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.route('/').get(async function getExercises(req, res) {
  const user_id = req.user._id

  const workouts = await Exercise.find({user_id}).sort({createdAt: -1})

  res.status(200).json(workouts)
});

router.route('/add').post((req, res) => {
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const user_id = req.user._id;

  const newExercise = new Exercise({
    description,
    duration,
    date,
    user_id,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
