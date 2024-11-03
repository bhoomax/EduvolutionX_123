import React, { useState } from 'react'; // Import React and useState for managing component state
import './Login.css'; // Import specific CSS styles for Login component
import logo1 from './pp.png'; // Import logo image for display in login box
import bg from './ol2.png'; // Import background image for right-side display

// Login component for handling user authentication
function Login({ onLoginSuccess }) {
    // State variables to store form input values and login status message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(''); // To display success or error messages

    // Function to handle login request
    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            // Send POST request to backend for login authentication
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify({ username, password }), // Include form data in request body
            });

            const data = await response.json(); // Parse JSON response from server

            if (data.success) {
                setLoginStatus('Login successful'); // Update status on successful login
                onLoginSuccess(username); // Pass username back to parent component to indicate login success
            } else {
                setLoginStatus('Invalid username or password'); // Display error message for failed login
            }
        } catch (error) {
            console.error('Login error:', error); // Log error details for debugging
            setLoginStatus('An error occurred'); // Inform user of error
        }
    };

    // Render the login form and associated elements
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <img src={logo1} alt="Logo" /> {/* Display logo image */}
                </div>
                <h2>Login</h2>
                
                {/* Form for user login */}
                <form onSubmit={handleLogin}>
                    {/* Input for username */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required // Make input required
                    />
                    
                    {/* Input for password */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required // Make input required
                    />
                    
                    {/* Button to submit the form */}
                    <button type="submit">Login</button>
                </form>

                {/* Display login status message if available */}
                {loginStatus && <p>{loginStatus}</p>}

                {/* Link for forgotten password (currently not functional) */}
                <a href="#">Forgot your password?</a>
            </div>

            {/* Right section with background image */}
            <div className="image-box">
                <img src={bg} alt="Login Image" /> {/* Display side image */}
            </div>
        </div>
    );
}

export default Login; // Export the component for use in other parts of the app
// This file provides the login functionality and layout, connecting to the backend for authentication.
// Please avoid altering functions or state variables without consulting the development team.
