
# Backend - The Royal Mobiles - Mobile Shop Website

This is the backend part of the full-stack mobile shop website, "The Royal Mobiles," created using Node.js, Express.js, and MongoDB. The backend handles API requests, manages the database, and interacts with the frontend.

## Features

- **Node.js & Express.js**: Used for creating the server and handling API requests.
- **MongoDB**: Used for storing data like mobile product information and user details.
- **RESTful APIs**: APIs for managing mobile data (fetch, add, update, delete) and user management.

## Project Structure

- **index.js**: Main entry point of the backend application.
- **models**: Contains Mongoose models for data structures (Mobile, User, etc.).
- **routes**: Handles API endpoints for mobile products and user actions.
- **controllers**: Contains logic for handling requests.
- **config**: Database connection configuration and other environment variables.

## Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/GiridharanS1729/theroyalmobiles.git
   cd theroyalmobiles
   ```

2. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables**:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and update the following variables:
     ```env
     MONGO_URI=your_mongo_connection_string
     PORT=1729
     ```
   - Replace `your_mongo_connection_string` with your actual MongoDB connection string.

4. **Run the server**:
   ```bash
   npm start
   ```

The server will be running locally at `http://localhost:1729`.

## Author

**Giridharan S**
