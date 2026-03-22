-- Database schema will be defined here

CREATE TABLE Customer (
    Customer_ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Phone VARCHAR(20) UNIQUE,
    Email VARCHAR(255) UNIQUE,
    Gender VARCHAR(10),
    Skin_type VARCHAR(255),
    Medical_history TEXT
);

CREATE TABLE Specialist (
    Specialist_ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Phone VARCHAR(20) UNIQUE,
    Role_type VARCHAR(255),
    Specialization TEXT
);

CREATE TABLE Receptionist (
    Receptionist_ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Phone VARCHAR(20) UNIQUE,
    Shift_info TEXT
);

CREATE TABLE Service (
    Service_ID SERIAL PRIMARY KEY,
    Service_name VARCHAR(255) NOT NULL,
    Price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE Booking (
    Booking_ID SERIAL PRIMARY KEY,
    Customer_ID INT REFERENCES Customer(Customer_ID),
    Service_ID INT REFERENCES Service(Service_ID),
    Specialist_ID INT REFERENCES Specialist(Specialist_ID),
    Date_and_Time TIMESTAMP NOT NULL,
    Status VARCHAR(50)
);

CREATE TABLE Treatment_Plan (
    Plan_ID SERIAL PRIMARY KEY,
    Customer_ID INT REFERENCES Customer(Customer_ID),
    Specialist_ID INT REFERENCES Specialist(Specialist_ID),
    Personal_goal TEXT,
    Status VARCHAR(50)
);

CREATE TABLE Session_Record (
    Session_ID SERIAL PRIMARY KEY,
    Booking_ID INT REFERENCES Booking(Booking_ID),
    Plan_ID INT REFERENCES Treatment_Plan(Plan_ID),
    Specialist_ID INT REFERENCES Specialist(Specialist_ID),
    Before_image VARCHAR(255),
    After_image VARCHAR(255),
    Notes TEXT
);

CREATE TABLE Invoice (
    Invoice_ID SERIAL PRIMARY KEY,
    Booking_ID INT REFERENCES Booking(Booking_ID),
    Payment_method VARCHAR(50),
    Total_amount NUMERIC(10, 2) NOT NULL,
    Status VARCHAR(50)
);

CREATE TABLE Feedback (
    Feedback_ID SERIAL PRIMARY KEY,
    Booking_ID INT REFERENCES Booking(Booking_ID),
    Rating_score INT CHECK (Rating_score >= 1 AND Rating_score <= 5),
    Comment TEXT
);

CREATE TABLE App_User (
    User_ID SERIAL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE,
    Phone VARCHAR(20) UNIQUE,
    Password_hash TEXT NOT NULL,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
