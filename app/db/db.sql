-- for help : \?

-- list database \l

-- create database CREATE DATABASE database-name;

-- list all tables \d

CREATE DATABASE rcoe_mentoring;

CREATE TABLE mentor(
    mentor_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    mentor_email TEXT NOT NULL UNIQUE,
    mentor_password TEXT NOT NULL,
    mentor_name TEXT NOT NULL
);

ALTER TABLE mentor
ADD COLUMN join_code TEXT UNIQUE;

CREATE TABLE mentee(
    mentee_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    mentee_email TEXT NOT NULL UNIQUE,
    mentee_password TEXT NOT NULL,
    mentee_name TEXT NOT NULL,
    mentee_department TEXT NOT NULL,
    mentee_year INTEGER NOT NULL,
    mentor_id uuid,
    CONSTRAINT fk_mentor FOREIGN KEY (mentor_id) REFERENCES mentor (mentor_id)
);

CREATE TABLE problem(
    problem_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    problem_title VARCHAR(100) NOT NULL, 
    problem_description VARCHAR(1000) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE,
    is_solved boolean,
    feedback VARCHAR (1000),
    mentee_id uuid,
    mentor_id uuid,
    CONSTRAINT fk_mentee FOREIGN KEY (mentee_id) REFERENCES mentee (mentee_id),
    CONSTRAINT fk_mentor FOREIGN KEY (mentor_id) REFERENCES mentor (mentor_id)
);

