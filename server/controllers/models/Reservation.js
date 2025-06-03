import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: {
    name: String,
    image: String,
    rating: Number,
  },
  date: String,
  guests: Number,
  created: { type: Date, default: Date.now }
});

export default mongoose.model('Reservation', ReservationSchema);
