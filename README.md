Paytm Clone
===========

This project is a full-stack web application replicating core functionalities of the Paytm platform, including user authentication, account balance management, and money transfers. It demonstrates modern web development practices using a combination of frontend and backend technologies.

Technology Stack
----------------

*   **Frontend**:
    
    *   **React**: For building a dynamic and responsive user interface.
        
    *   **Tailwind CSS**: For efficient and customizable styling.
        
*   **Backend**:
    
    *   **Node.js**: Server-side runtime environment.
        
    *   **Express**: Web framework for handling API routes.
        
    *   **MongoDB**: NoSQL database for storing user and account data.
        
    *   **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
        
    *   **JSON Web Tokens (JWT)**: For secure user authentication.
        
    *   **Zod**: For input validation and data integrity.
        

Project Structure
-----------------

*   **frontend/**: Contains the React application.
    
    *   src/components/: Reusable UI components (e.g., AppBar.jsx, Balance.jsx, Button.jsx).
        
    *   src/pages/: Main application pages (e.g., Dashboard.jsx, SendMoney.jsx, Signup.jsx, Signin.jsx).
        
*   **backend/**: Contains the Express server and API logic.
    
    *   routes/: API endpoints for user and account management (user.js, account.js).
        
    *   db.js: MongoDB connection and schema definitions.
        
    *   index.js: Main server entry point.
        
    *   middlewares.js: Authentication middleware for securing routes.
        

Installation
------------

### Prerequisites

*   **Node.js** and **npm**: Required for running the application.
    
*   **MongoDB**: A local or cloud-based MongoDB instance (e.g., MongoDB Atlas).
    

### Setup Instructions

1.  git clone https://github.com/Adarsh-ops/paytm-clone.gitcd paytm-clone
    
2.  **Install Dependencies**:
    
    *   cd backendnpm install
        
    *   cd ../frontendnpm install
        
3.  **Configure Environment Variables**:
    
    *   MONGO\_URI=your\_mongodb\_connection\_stringJWT\_SECRET=your\_jwt\_secret\_key
        
    *   Replace your\_mongodb\_connection\_string with your MongoDB connection string and your\_jwt\_secret\_key with a secure secret key.
        
4.  **Run the Application**:
    
    *   cd backendnpm start
        
        *   The server runs on http://localhost:4004 by default.
            
    *   cd ../frontendnpm start
        
        *   The frontend runs on http://localhost:5173 (or the port specified by Vite).
            
5.  **Access the Application**:
    
    *   Open http://localhost:5173 in a web browser to use the application.
        

API Endpoints
-------------

### User Routes

*   **POST /api/v1/user/signup**: Register a new user.
    
    *   Request Body: { username, password, firstName, lastName }
        
    *   Response: { message, token }
        
*   **POST /api/v1/user/signin**: Authenticate an existing user.
    
    *   Request Body: { username, password }
        
    *   Response: { message, token }
        
*   **PUT /api/v1/user/**: Update user information (requires authentication).
    
    *   Headers: Authorization: Bearer
        
    *   Request Body: { password?, firstName?, lastName? }
        
    *   Response: { message }
        
*   **GET /api/v1/user/bulk**: Retrieve filtered list of users (requires authentication).
    
    *   Query Parameters: filter (optional)
        
    *   Headers: Authorization: Bearer
        
    *   Response: { user: \[{ username, firstName, lastName, \_id }\] }
        
*   **GET /api/v1/user/getName**: Retrieve the authenticated user's details.
    
    *   Headers: Authorization: Bearer
        
    *   Response: { username, firstName, lastName, \_id }
        

### Account Routes

*   **GET /api/v1/account/balance**: Retrieve the authenticated user's account balance.
    
    *   Headers: Authorization: Bearer
        
    *   Response: { message: balance }
        
*   **POST /api/v1/account/transfer**: Transfer money to another user (requires authentication).
    
    *   Headers: Authorization: Bearer
        
    *   Request Body: { amount, to }
        
    *   Response: { message }
        

Security Features
-----------------

*   **JWT Authentication**: Ensures secure user sessions via token-based authentication.
    
*   **Environment Variables**: Sensitive data (e.g., MongoDB URI, JWT secret) is stored in a .env file, which is excluded from version control.
    
*   **Zod Validation**: Ensures robust input validation for API requests.
    

Contributing
------------

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure your code adheres to the project's coding standards and includes appropriate tests.

License
-------

This project is licensed under the MIT License. See the [LICENSE](https://grok.com/chat/LICENSE) file for details.