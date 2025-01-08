CREATE DATABASE eventmanager;

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Unique identifier for the user
    email VARCHAR(255) UNIQUE NOT NULL,             -- User's email address
    password_hash TEXT NOT NULL,                    -- Hashed password for secure authentication
    full_name VARCHAR(255),                         -- User's full name
    profile_picture TEXT,                           -- URL for user's profile picture
    bio TEXT,                                       -- Short bio or description
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,    -- Timestamp of account creation
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL     -- Timestamp of last account update
);

-- Events Table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Unique identifier for the event
    name VARCHAR(255) NOT NULL,                     -- Name of the event
    description TEXT,                               -- Detailed description of the event
    location VARCHAR(255),                          -- Location of the event
    start_time TIMESTAMP NOT NULL,                  -- Start time of the event
    end_time TIMESTAMP NOT NULL,                    -- End time of the event
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- User who created the event
    admins UUID[] NOT NULL,                         -- Array of user IDs (admins) who can edit the event
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,    -- Timestamp of event creation
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL     -- Timestamp of last event update
);

-- Participants Table (Many-to-Many Relationship Between Users and Events)
CREATE TABLE participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Unique identifier for the participant record
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- User attending the event
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE, -- Event the user is attending
    created_at TIMESTAMP DEFAULT NOW() NOT NULL     -- Timestamp of record creation
);
