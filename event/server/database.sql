CREATE DATABASE competitionmanager;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    profile_picture TEXT,
    contact_no VARCHAR(15), 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    registration_deadline TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Admins
CREATE TABLE event_admins (
    event_id INT REFERENCES events(id),
    user_id INT REFERENCES users(id),
);

-- Form Fields Table
CREATE TABLE form_fields (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    field_type VARCHAR(50) NOT NULL, 
    options JSONB, 
    is_required BOOLEAN DEFAULT TRUE,
    ind SERIAL,
    event_id INT REFERENCES events(id)
);

-- Form Responses Table
CREATE TABLE form_responses (
    id SERIAL PRIMARY KEY,
    submitted_by INT REFERENCES users(id) ON DELETE SET NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_id INT REFERENCES events(id)
);

-- Response Data Table
CREATE TABLE response_data (
    response_id INT REFERENCES form_responses(id),
    field_id INT REFERENCES form_fields(id),
    value TEXT
)