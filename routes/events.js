/**
 * Router Events / events
 * host + /api/events
 */
const { Router } = require('express');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

// All events must pass JWT validation
router.use(validateJWT);

// Get events
router.get('/', getEvents);

// create a new event
router.post('/', createEvent);

// Update a Event
router.put('/:id', updateEvent);

// Delete a Event
router.delete('/:id', deleteEvent);

module.exports = router;
