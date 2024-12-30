import React, { useEffect, useState } from "react";
import { getAllBookings, deleteBooking, updateBooking } from "../api"; // Import from your api.js

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getAllBookings();
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      setBookings(bookings.filter((booking) => booking.bookingId !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setEditFormData(booking);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await updateBooking(editFormData);
      fetchBookings();
      setEditingBooking(null);
      setEditFormData({});
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
    setEditFormData({});
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  if (editingBooking) {
    return (
      <div>
        <h2>Edit Booking</h2>
        <form onSubmit={handleSaveEdit}>
          <input
            type="text"
            name="mobileNo"
            value={editFormData.mobileNo || ""}
            onChange={handleEditFormChange}
            placeholder="Mobile No"
          />
          <br />
          <input
            type="text"
            name="hallName"
            value={editFormData.hallName || ""}
            onChange={handleEditFormChange}
            placeholder="Hall Name"
          />
          <br />
          <input
            type="text"
            name="applicantName"
            value={editFormData.applicantName || ""}
            onChange={handleEditFormChange}
            placeholder="Applicant Name"
          />
          <br />
          <input
            type="email"
            name="email"
            value={editFormData.email || ""}
            onChange={handleEditFormChange}
            placeholder="Email"
          />
          <br />
          <input
            type="date"
            name="startDate"
            value={editFormData.startDate ? editFormData.startDate.split('T')[0] : ""} // Format for date input
            onChange={handleEditFormChange}
            placeholder="Start Date"
          />
          <br />
          <input
            type="date"
            name="endDate"
            value={editFormData.endDate ? editFormData.endDate.split('T')[0] : ""} // Format for date input
            onChange={handleEditFormChange}
            placeholder="End Date"
          />
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        </form>
      </div>
    );
  }

  return (
    <table className="booking-table">
      <thead>
        <tr>
          <th>Mobile No</th>
          <th>Hall Name</th>
          <th>Applicant Name</th>
          <th>Email</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Total</th>
          <th>Application Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.bookingId}>
            <td>{booking.mobileNo}</td>
            <td>{booking.hallName}</td>
            <td>{booking.applicantName}</td>
            <td>{booking.email}</td>
            <td>{formatDate(booking.startDate)}</td>
            <td>{formatDate(booking.endDate)}</td>
            <td>{booking.total}</td>
            <td>{booking.receiptNo}</td>
            <td>
              <button onClick={() => handleEdit(booking)}>Edit</button>
              <button onClick={() => handleDelete(booking.bookingId)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingList;