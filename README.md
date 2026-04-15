# Student Information System

A mini student information system built to simulate enterprise-style academic data management workflows. This project was designed to reflect responsibilities similar to a PeopleSoft Developer/Analyst role, including database design, SQL reporting, backend API development, testing, and documentation.

## Features

- Add students
- View all students
- Delete students
- Generate student report data
- Relational database with departments, instructors, courses, students, and enrollments
- REST API using Express
- Frontend interface using HTML, CSS, and JavaScript

## Tech Stack

- PostgreSQL
- Express.js
- Node.js
- JavaScript
- HTML
- CSS
- Postman

## Database Design

The database includes the following tables:

- departments
- instructors
- students
- courses
- enrollments

Relationships:

- One department has many instructors
- One department has many courses
- One instructor can teach many courses
- One student can have many enrollments
- One course can have many enrollments

## API Endpoints

- `GET /students` — return all students
- `POST /students` — create a student
- `PUT /students/:id` — update a student
- `DELETE /students/:id` — delete a student
- `GET /report` — return joined student/course/grade report data

## Example Use Cases

- Track student enrollment records
- Generate academic report data
- Practice SQL joins and reporting queries
- Simulate core student system workflows found in enterprise environments

## What I Practiced

- Relational database schema design
- SQL joins, filtering, and reporting
- CRUD API development
- Backend testing with Postman
- Debugging route and connection issues
- Serving a frontend from an Express application

## Running the Project Locally

1. Clone the repository
2. Install dependencies with `npm install`
3. Update PostgreSQL connection settings in `server.js`
4. Run the server with `node server.js`
5. Visit `http://localhost:3000`

## Future Improvements

- Add edit-student functionality in the frontend
- Add authentication and role-based access
- Improve error handling and validation
- Export reports to CSV
- Add pagination and search
