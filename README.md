# Hall Booking Application

This project is a **Hall Booking System** that includes a backend developed using **Spring Boot** and a frontend developed using **React.js**. The project also uses **PostgreSQL** as the database to manage hall bookings.

**Table of Contents**
1.Overview
2.PostgreSQL Setup
  1.Listing Databases
  2.Creating Tables
  3.Creating Functions
  4.Final Check
3.Backend Setup
  1.Project Structure
  2.How to Run the Backend
4.Frontend Setup
  1.How to Run the Frontend

**Overview**
This project allows users to book halls, track their booking status, and manage booking details (e.g., rent, charges). The **backend** serves as a REST API, and the **frontend** provides a user-friendly interface for managing bookings.

**PostgreSQL Setup**
*Listing Databases*
Command: \l
Explanation:

*This command lists all databases in the PostgreSQL instance.
*Output columns:
  *Name: Database name (e.g., postgres, template0, template1).
  *Owner: The user who owns the database.
  *Encoding, Collate, Ctype: Character set and locale settings.
  *Access privileges: Permissions for users.

*Creating Tables*
Command:

CREATE TABLE hall_booking (
    booking_id SERIAL PRIMARY KEY,
    mobile_no VARCHAR(15),
    hall_name VARCHAR(100),
    applicant_name VARCHAR(100),
    email VARCHAR(100),
    rent DECIMAL(10, 2),
    additional_charges DECIMAL(10, 2),
    total DECIMAL(10, 2),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Pending'
);

Explanation:
*This command creates the hall_booking table to store booking information.
*Key columns include:
  *booking_id: Auto-incrementing primary key.
  *mobile_no, hall_name, applicant_name, email: Store applicant details.
  *rent, additional_charges, total: Financial information.
  *start_date, end_date: Track booking schedule.
  *status: Default is "Pending".

**Creating Functions for Booking Management**
*Insert Booking*
Command:

CREATE OR REPLACE FUNCTION insert_booking(
    mobile_no VARCHAR(15),
    hall_name VARCHAR(100),
    applicant_name VARCHAR(100),
    email VARCHAR(100),
    rent DECIMAL(10, 2),
    additional_charges DECIMAL(10, 2),
    total DECIMAL(10, 2),
    start_date TIMESTAMP,
    end_date TIMESTAMP
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO hall_booking (mobile_no, hall_name, applicant_name, email, rent, additional_charges, total, start_date, end_date)
    VALUES (mobile_no, hall_name, applicant_name, email, rent, additional_charges, total, start_date, end_date);
END;
$$ LANGUAGE plpgsql;

Explanation:This function adds a new booking to the hall_booking table.

*Update Booking*
Command:

CREATE OR REPLACE FUNCTION update_booking(
    _booking_id INT,
    _mobile_no VARCHAR(15),
    _hall_name VARCHAR(100),
    _applicant_name VARCHAR(100),
    _email VARCHAR(100),
    _rent DECIMAL(10, 2),
    _additional_charges DECIMAL(10, 2),
    _total DECIMAL(10, 2),
    _start_date TIMESTAMP,
    _end_date TIMESTAMP
)
RETURNS VOID AS $$
BEGIN
    UPDATE hall_booking
    SET mobile_no = _mobile_no,
        hall_name = _hall_name,
        applicant_name = _applicant_name,
        email = _email,
        rent = _rent,
        additional_charges = _additional_charges,
        total = _total,
        start_date = _start_date,
        end_date = _end_date
    WHERE booking_id = _booking_id;
END;
$$ LANGUAGE plpgsql;
Explanation: This function updates an existing booking with new values.

*Final Check*
Command:
\l

Explanation: Re-check the list of databases to ensure no unintended changes were made.

**Backend Setup**

*How to Run the Backend*
*Navigate to the project root (where pom.xml is located).
*Build the project using Maven:

mvn clean install 
mvn spring-boot:run

**Frontend Setup**
*How to Run the Frontend*
*Navigate to the frontend directory and install dependencies:
npm install --force

Start the frontend application:
npm start

***Conclusion***
This project demonstrates a full-stack application with a PostgreSQL backend, a Spring Boot REST API, and a React.js frontend. Ensure you have both the backend and frontend running together for the complete experience.

Let me know if you need further clarification or have any issues!
