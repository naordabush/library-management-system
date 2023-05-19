# Library Management System

This is a Library Management System web application built with React.js for the frontend and Java, Spring Boot, Maven, and MySQL for the backend. The application allows users to manage members and books in a library, including adding, editing, and deleting members and books.

## Features

- Add, edit, and delete members
- Add, edit, and delete books
- Search functionality:
  - Search members by name
  - Search members by complaints (equal, bigger than, smaller than)
- User authentication and authorization

## Technologies Used

- Frontend:
  - React.js
  - React Router
  - Axios
  - HTML/CSS

- Backend:
  - Java
  - Spring Boot
  - Maven
  - MySQL (or any other database of your choice)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/library-management-system.git`
2. Set up the backend:
   - Import the backend project into your preferred Java IDE.
   - Configure the MySQL database connection in the application properties file.
   - Run the backend application to start the server.
3. Install frontend dependencies: `npm install`
4. Configure the frontend API endpoint:
   - Update the API endpoint in the frontend code (`src/api/api.js`) to match your backend server.
5. Start the development server: `npm start`
6. Access the application in your browser at `http://localhost:3000`

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
