# Employee Management System

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [API](#api)
- [Running the Application](#running-the-application)

## Project Overview

The Employee Management System is a web application designed to help manage employee information efficiently. It provides a user-friendly interface for administrators to perform CRUD operations on employee data, including adding, updating, deleting, and viewing employee details. The application is built using Angular for the frontend, Spring Boot for the backend, PostgreSQL as the database, and Docker for containerization.

## Technologies Used

- **Frontend:** Angular, SpartanUI
- **Backend:** Spring Boot
- **Database:** PostgreSQL
- **Containerization:** Docker
- **Development Tools:** Maven, Node.js, npm

## API

The backend provides the following RESTful endpoints:
| Method | Endpoint | Description |
| -------- | ------- | ------- |
| GET | /api/employee/all | Fetch all employees |
| POST | /api/employee/create | Create employee |
| PUT | /api/employee/update | Update employee |
| DELETE | /api/employee/delete?id | Delete employee |
| POST | /api/employee/search | Search employees based on first name, last name or position |

## Running the application

### Prerequisites

Before you begin, ensure you have docker installed on your machine

### Clone the Repository

```powershell
git clone https://github.com/rammer17/employee-management-system.git
```

### Build the backend

```powershell
cd backend
mvn clean install
```

Make sure the PostgreSQL database is running and update the application.properties with the correct credentials (if needed).

### Docket setup

A docker-compose.yml file is provided to set up the services. It will build the backend and frontend images, and also set up the PostgreSQL database.

To build and start the containers, run:

```powershell
docker-compose up
```

Once the services are up, the frontend will be available at http://localhost:80 and the backend will be running on http://localhost:8080.
