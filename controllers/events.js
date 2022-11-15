const { response } = require('express');
const Event = require('../models/Events');

const getEvents = async (req, res = response) => {
  const event = await Event.find().populate('user', 'name'); // .populate('user', 'name password')

  res.json({
    ok: true,
    event,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
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
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese ID',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: 'false',
        msg: 'No tiene privilegio de editar este evento',
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: updateEvent,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
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
