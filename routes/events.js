/**
 * Router Events / events
 * host + /api/events
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/fieldValidation');
const { validateJWT } = require('../middlewares/validateJWT');

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

// All events must pass JWT validation
router.use(validateJWT);

// Get events
router.get('/', getEvents);

// create a new event
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('start', 'Fecha de finalizacion es obligatoria').custom(isDate),
    fieldValidation,
  ],
  createEvent
);

// Update a Event
router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('start', 'Fecha de finalizacion es obligatoria').custom(isDate),
    fieldValidation,
  ],
  updateEvent
);

// Delete a Event
router.delete('/:id', deleteEvent);

module.exports = router;
