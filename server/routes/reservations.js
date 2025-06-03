import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

// POST /api/reservations
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    const saved = await reservation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET reservations for a user
router.get('/:userId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.userId });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a reservation
router.delete('/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
