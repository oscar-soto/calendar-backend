const { response } = require('express');
const Event = require('../models/Events');

const getEvents = async (req, res = response) => {
  // Check Event
  console.log(req.body);

  res.json({
    ok: true,
    msg: 'Get events',
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid
    const eventSave = await event.save();

    res.json({
      ok: true,
      event: eventSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const updateEvent = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Update events',
  });
};

const deleteEvent = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Delete events',
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
