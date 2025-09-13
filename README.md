# Database AI Agent Backend Code Here :- https://github.com/codezshubham/DatabaseAgentB

# DatabaseAgentF

[![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)]()
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]()

## Description

DatabaseAgentF is a React-based application that allows users to connect to a database and execute queries using a natural language interface. It leverages AI to translate user questions into SQL queries, simplifying database interactions. The application uses a Tailwind CSS for styling and provides a user-friendly interface for database connection and query execution.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Important Links](#important-links)
- [Footer](#footer)

## Features

- 🔌 **Database Connection**: Connect to a database by providing host, port, user, password, and database name.
- 💬 **AI-Powered Query Generation**: Translate natural language questions into SQL queries.
- 🚀 **SQL Execution**: Execute generated SQL queries and view results in a tabular format.
- 📋 **SQL Copy**: Copy generated SQL queries to the clipboard.
- 💾 **Connection Persistence**: Automatically reconnect to the database using saved credentials.
- 💡 **Example Questions**: Provides example questions for interacting with the database.
- ⚡ **Real-time Notifications**: Uses `react-toastify` for user notifications.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Libraries**: `@headlessui/react`, `@heroicons/react`, `axios`, `lucide-react`, `react-toastify`
- **Other**: JavaScript, HTML, CSS

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/codezshubham/DatabaseAgentF.git
    cd DatabaseAgentF
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a `.env` file in the root directory.
    -   Add the backend URL (if different from the default) to the `.env` file:
        ```
        REACT_APP_BACKEND_URL=http://localhost:5000
        ```

## Usage

1.  **Start the application:**
    ```bash
    npm start
    ```

2.  **Open the application in your browser** (usually at `http://localhost:3000`).

3.  **Connect to the database:**
    -   Enter the database connection details (host, port, user, password, database name) in the `Database Connection` panel.
    -   Click the `Connect` button.

4.  **Ask questions and execute queries:**
    -   In the `Query Panel`, enter your question in the input field.
    -   Click the `Generate SQL` button to generate the SQL query.
    -   Review the generated SQL query.
    -   Click the `Execute This` button to execute the query and view the results.

### Use Cases

*   **Data Analysis**: Quickly retrieve and analyze data from your database using natural language.
*   **Rapid Prototyping**: Generate SQL queries for prototyping database interactions.
*   **Educational Purposes**: Learn SQL by comparing your natural language queries with the generated SQL.

## Project Structure

```
DatabaseAgentF/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── Components/
│   │   ├── DBConnection.js
│   │   └── QueryPanel.js
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
│   └── setupTests.js
├── tailwind.config.js
├── package.json
└── README.md
```

-   `public/`: Contains static assets like `index.html`, `manifest.json`, and `robots.txt`.
-   `src/`:
    -   `Components/`: Contains React components.
        -   `DBConnection.js`: Manages the database connection form and logic.
        -   `QueryPanel.js`: Handles the query input, SQL generation, and result display.
    -   `App.js`: Main application component.
    -   `App.css`: CSS file for the `App` component.
    -   `index.js`: Entry point for the React application.
    -   `index.css`: Global CSS file, imports tailwind directives.
    -   `reportWebVitals.js`: Configures performance monitoring.
    -   `setupTests.js`: Sets up the testing environment.
-   `tailwind.config.js`: Configuration file for Tailwind CSS.
-   `package.json`: Contains project metadata and dependencies.

## Contributing

Contributions are welcome! Here are the steps to contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Commit your changes with descriptive commit messages.
5.  Push your changes to your fork.
6.  Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Important Links

-   **Repository:** [https://github.com/codezshubham/DatabaseAgentF](https://github.com/codezshubham/DatabaseAgentF)

## Footer

DatabaseAgentF - [https://github.com/codezshubham/DatabaseAgentF](https://github.com/codezshubham/DatabaseAgentF)

Author: codezshubham

Contact: (Provide contact info here if you want to be contacted)

⭐️ Give a star to the repository if you like the project!

Fork the repository to contribute and make it better!


<p align="center">[This Readme generated by ReadmeCodeGen.](https://www.readmecodegen.com/)</p>
