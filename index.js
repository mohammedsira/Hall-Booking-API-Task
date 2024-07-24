const express = require("express");
const bodyParser = require("body-parser");
// const { createRoomSchema } = require('./validators/roomValidator');
// const { createBookingSchema } = require('./validators/bookingValidator');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for rooms and bookings
let rooms = [];
let bookings = [];

// Helper function to generate unique IDs
const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

// Routes

// Create a new room
app.post("/rooms", (req, res) => {
    const { name, numberOfSeats, amenities, pricePerHour } = req.body;
    const room = {
        id: generateId(),
        name,
        numberOfSeats,
        amenities,
        pricePerHour,
        bookings: [],
    };
    rooms.push(room);
    res.status(201).json(room);
});

// Book a room
app.post("/book-room", (req, res) => {
    // console.log(rooms);
    const { customerName, date, startTime, endTime, roomId } = req.body;
    const room = rooms.find((r) => r.id === roomId);
    if (!room) {
        return res.status(404).send("Room not found");
    }

    // Check for booking conflicts
    const conflictingBooking = room.bookings.some(
        (booking) =>
            booking.date === date &&
            ((startTime >= booking.startTime && startTime < booking.endTime) ||
                (endTime > booking.startTime && endTime <= booking.endTime) ||
                (startTime <= booking.startTime && endTime >= booking.endTime))
    );
    if (conflictingBooking) {
        return res
            .status(400)
            .send("Room is already booked for the specified time slot");
    }

    const booking = {
        id: generateId(),
        customerName,
        date,
        startTime,
        endTime,
        roomId,
        bookingDate: new Date().toISOString(),
        bookingStatus: "confirmed",
    };
    room.bookings.push(booking);
    bookings.push(booking);
    res.status(201).json(booking);
});

// List all rooms with their booking status
app.get("/rooms", (req, res) => {
    const roomDetails = rooms.map((room) => ({
        ...room,
        bookings: room.bookings.map((booking) => ({
            customerName: booking.customerName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingStatus: booking.bookingStatus,
        })),
    }));
    res.json(roomDetails);
});

// List all customers with their booking data
app.get("/customers", (req, res) => {
    const customers = bookings.map((booking) => ({
        customerName: booking.customerName,
        roomName: rooms.find((room) => room.id === booking.roomId).name,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
    }));
    res.json(customers);
});

// List how many times a customer has booked a room with booking details
app.get("/customer-bookings/:customerName", (req, res) => {
    const { customerName } = req.params;
    const customerBookings = bookings
        .filter((booking) => booking.customerName === customerName)
        .map((booking) => ({
            customerName: booking.customerName,
            roomName: rooms.find((room) => room.id === booking.roomId).name,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingId: booking.id,
            bookingDate: booking.bookingDate,
            bookingStatus: booking.bookingStatus,
        }));
    res.json(customerBookings);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});