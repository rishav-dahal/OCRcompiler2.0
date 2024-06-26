# OCR_Compiler

__OCR_Compiler__ OCR Compiler is a web application designed to streamline the process of converting text into formatted code. It leverages Optical Character Recognition (OCR) technology to scan text, extract code snippets, and format them according to the user’s preferences. The formatted code can then be compiled within the application, eliminating the need for manual transcription and formatting

## Installation

<sub><sup>__Note__: This project uses React for the frontend, Django for the backend, and PostgreSQL as the database. Docker is used for containerization.</sup></sub>

### Prerequisites

- Docker

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/rishav-dahal/OCRcompiler2.0.git
    ```

2. Navigate to the project directory:

    ```bash
    cd OCRcompiler
    ```

3. Build and run the Docker containers:

    ```bash
    docker-compose up --build
    ```

4. Access the application in your web browser at `http://localhost:3000`.

## Objectives

- The current objective of the project is:
  - To develop a web-app, providing a platform to scan and compile printed code snippets in realtime