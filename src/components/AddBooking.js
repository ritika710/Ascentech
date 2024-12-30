import React from "react";
import BookingForm from "./BookingForm";

const AddBooking = () => {
  return (
    <div style={{ padding: "32px", textAlign: "center" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "40px", color: "blue", marginBottom: "20px" }}>
        Hall Booking Form
      </h2>
      <BookingForm />
    </div>
  );
};

export default AddBooking;
