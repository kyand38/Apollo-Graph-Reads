# Apollo-Graph-Reads
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
A full-stack application built with the MERN stack (MongoDB, Express.js, React, and Node.js) that allows users to authenticate, save books, and manage their saved list.

## Table of Contents
 - [Features](#features)
 - [Technologies Used](#technologies-used)
 - [Installation](#installation)
 - [Usage](#usage)
 - [Deployment](#deployment)
 - [License](#license)
 - [Contact](#contact)
 

## Features
 - User Authentication: Secure signup and login functionality using JSON Web Tokens (JWT).
 - Search for Books: Integrated with the Google Books API for dynamic book searches.
 - Save Favorite Books: Allows logged-in users to save books to their profile.
 - Manage Saved Books: Users can view and remove books from their saved list.
 - Responsive Design: Built with React and Bootstrap for a mobile-friendly experience.


## Tecnologies Used
 - Frontend: React, React-Bootstrap, Apollo Client
 - Backend: Node.js, Express.js, Apollo Server
 - Database: MongoDB (Atlas)
 - GraphQL: Queries and Mutations for API interaction
 - Authentication: JSON Web Tokens (JWT)


## Installation
1. Clone the repository:
    ```bash
    git clone git@github.com:kyand38/Apollo-Graph-Reads.git
2. Install dependencies:
 - Root dependencies:
    ```bash
    npm install
 - Server dependencies:
    ```bash
    cd server
    npm install
 - Client dependencies
    ```bash
    cd ../client<br/>
    npm install
3. Set up environment variables:
 - Create a .env file in the server directory with the following:  
    ```makefile
    MONGODB_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
4. Run the application locally:
    ```bash
    npm run start:dev


## Usage
1. Navigate to http://localhost:3000 in your browser.
2. Sign up or log in to your account.
3. Search for books using the search bar.
4. Save books to your profile and manage your saved list.


## Deployment
    The application is deployed on Render and can be accessed at:
    https://apollo-8bcm.onrender.com/


## License
This application is covered under the following license: [MIT License](https://www.gnu.org/licenses/gpl-3.0)
    

## Contact
 - https://github.com/kyand38/
 - kyand2024@gmail.com
    




