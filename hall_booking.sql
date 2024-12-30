-- Database: hall_booking

-- DROP DATABASE IF EXISTS hall_booking;

-- Create table for Hall Booking System
CREATE TABLE hall_booking (
    booking_id SERIAL PRIMARY KEY,
    mobile_no VARCHAR(15) NOT NULL,
    hall_name VARCHAR(100) NOT NULL,
    applicant_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    purpose_of_use TEXT,
    rent NUMERIC NOT NULL,
    additional_charges NUMERIC,
    total NUMERIC,
    remark TEXT,
    receipt_no VARCHAR(50),
    receipt_date DATE,
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'Pending'
);

-- Add stored procedures for CRUD operations

-- Procedure to insert a new booking
CREATE OR REPLACE FUNCTION insert_booking(
    _mobile_no VARCHAR,
    _hall_name VARCHAR,
    _applicant_name VARCHAR,
    _email VARCHAR,
    _purpose_of_use TEXT,
    _rent NUMERIC,
    _additional_charges NUMERIC,
    _total NUMERIC,
    _remark TEXT,
    _receipt_no VARCHAR,
    _receipt_date DATE,
    _start_date DATE,
    _end_date DATE
) RETURNS VOID AS $$
BEGIN
    INSERT INTO hall_booking (
        mobile_no, hall_name, applicant_name, email, purpose_of_use, rent, 
        additional_charges, total, remark, receipt_no, receipt_date, start_date, end_date
    ) VALUES (
        _mobile_no, _hall_name, _applicant_name, _email, _purpose_of_use, _rent, 
        _additional_charges, _total, _remark, _receipt_no, _receipt_date, _start_date, _end_date
    );
END;
$$ LANGUAGE plpgsql;

-- Procedure to update a booking
CREATE OR REPLACE FUNCTION update_booking(
    _booking_id INT,
    _mobile_no VARCHAR,
    _hall_name VARCHAR,
    _applicant_name VARCHAR,
    _email VARCHAR,
    _purpose_of_use TEXT,
    _rent NUMERIC,
    _additional_charges NUMERIC,
    _total NUMERIC,
    _remark TEXT,
    _receipt_no VARCHAR,
    _receipt_date DATE,
    _start_date DATE,
    _end_date DATE
) RETURNS VOID AS $$
BEGIN
    UPDATE hall_booking SET
        mobile_no = _mobile_no,
        hall_name = _hall_name,
        applicant_name = _applicant_name,
        email = _email,
        purpose_of_use = _purpose_of_use,
        rent = _rent,
        additional_charges = _additional_charges,
        total = _total,
        remark = _remark,
        receipt_no = _receipt_no,
        receipt_date = _receipt_date,
        start_date = _start_date,
        end_date = _end_date
    WHERE booking_id = _booking_id;
END;
$$ LANGUAGE plpgsql;

-- Procedure to delete a booking
CREATE OR REPLACE FUNCTION delete_booking(_booking_id INT) RETURNS VOID AS $$
BEGIN
    DELETE FROM hall_booking WHERE booking_id = _booking_id;
END;
$$ LANGUAGE plpgsql;

-- Procedure to fetch all bookings
CREATE OR REPLACE FUNCTION get_all_bookings() RETURNS TABLE (
    booking_id INT,
    mobile_no VARCHAR,
    hall_name VARCHAR,
    applicant_name VARCHAR,
    email VARCHAR,
    purpose_of_use TEXT,
    rent NUMERIC,
    additional_charges NUMERIC,
    total NUMERIC,
    remark TEXT,
    receipt_no VARCHAR,
    receipt_date DATE,
    start_date DATE,
    end_date DATE,
    status VARCHAR
) AS $$
BEGIN
    RETURN QUERY SELECT * FROM hall_booking;
END;
$$ LANGUAGE plpgsql;
