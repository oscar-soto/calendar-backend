const { response } = require('express');

const getEvents = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Get events',
  });
};

const createEvent = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Crate events',
  });
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
  deleteEvent
};
