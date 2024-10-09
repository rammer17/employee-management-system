# Employee Management System - Full Stack Task

## Objective
Build a simple **Employee Management System** using Angular for the front end and Spring Boot for the back end. Implement basic CRUD operations, along with a search feature.

## Requirements

### 1. Features to Implement
Create a web application that supports the following features:

- **View Employee List**: Display a list of employees with basic details.
- **Create New Employee**: Add a new employee to the system.
- **Edit Employee**: Update the information of an existing employee.
- **Delete Employee**: Remove an employee from the system.
- **Search Employees**: Implement search functionality based on employee attributes like `name` and/or `job title`.

### 2. Frontend Requirements
- Use **Angular** for building the frontend.
- Implement a user interface with two main views:
    1. **List View**: Show the list of employees with options to edit or delete.
    2. **Form View**: Create and edit employee details.
- Use **Reactive Forms** for employee creation and editing.
- Basic styling using either **Angular Material** or **Bootstrap** is encouraged.

### 3. Backend Requirements
- Use **Spring Boot** to build a RESTful API that connects to a database.
- Implement basic CRUD endpoints for managing employees.
- **Search API**: Implement an endpoint to search employees based on their `name` and/or `job title`.
- Choose any database of your preference (H2, MySQL, PostgreSQL, etc.).

### 4. Additional Requirements
- Include **basic validation** for employee data both on the frontend and backend (e.g., required fields, valid email, etc.).
- Implement **error handling** for failed requests or invalid data entries.
- Include a README file with setup instructions, application overview, and API endpoint descriptions.

## Bonus Points
- Implement **pagination** and **sorting** on the backend for the employee list.
- Use **Angular services** to manage API calls and state management.
- Include **unit tests** for both backend and frontend components.
- Provide **Swagger** or **Postman documentation** for the API.

## Deliverables
- A GitHub repository with the full source code.
- Clear instructions in the README for building and running the application.
- Proper project structure and code organization.
