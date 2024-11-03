import React, { useState } from 'react'; // Import React and useState for managing component state
import './CreateAccount.css'; // Import specific CSS styles for CreateAccount component
import bg from './il.png'; // Import background image for the left section

// CreateAccount component to handle user registration
function CreateAccount({ onAccountCreated, onRedirectToLogin }) {
    // State variables to store form input values
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(''); // Status message for displaying feedback to user

    // Function to handle sign-up process
    const handleSignUp = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            // Send POST request to backend to create a new account
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify({ firstName, lastName, email, password }), // Include form data in request body
            });

            // Parse JSON response
            const data = await response.json();

            if (data.success) {
                setStatus('Account created successfully'); // Update status on successful account creation
                onAccountCreated(); // Call function to redirect user to login
            } else {
                setStatus(data.error || 'Failed to create account'); // Display error message
            }
        } catch (error) {
            console.error('Sign-up error:', error); // Log error details for debugging
            setStatus('An error occurred. Check the console for details.'); // Inform user of error
        }
    };

    // Render the sign-up form and associated elements
    return (
        <div className="container">
            <div className="left">
                <img src={bg} alt="Desert Landscape" /> {/* Display background image */}
                <a href="#" className="back-to-website">Back to website →</a> {/* Link to return to the main website */}
            </div>
            <div className="right">
                <h1>Create an account</h1>
                <p>Already have an account? <a href="#" onClick={onRedirectToLogin}>Log in</a></p> {/* Redirect to login */}
                
                {/* Form for creating an account */}
                <form onSubmit={handleSignUp}>
                    <div className="name-fields">
                        {/* Input for first name */}
                        <div className="form-group">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required // Make input required
                            />
                        </div>
                        {/* Input for last name */}
                        <div className="form-group">
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required // Make input required
                            />
                        </div>
                    </div>
                    
                    {/* Input for email */}
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required // Make input required
                        />
                    </div>
                    
                    {/* Input for password */}
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required // Make input required
                        />
                    </div>

                    {/* Terms and Conditions agreement checkbox */}
                    <div className="checkbox">
                        <input type="checkbox" id="terms" name="terms" required /> {/* Make checkbox required */}
                        <span>I agree to the <a href="#">Terms & Conditions</a></span>
                    </div>

                    {/* Button to submit the form */}
                    <button type="submit" className="btn">Create account</button>
                </form>

                {/* Display status message if available */}
                {status && <p>{status}</p>}
            </div>
        </div>
    );
}

export default CreateAccount; // Export the component for use in other parts of the app
// This file defines the core structure and functionality for the account creation page.
// Please do not modify the functions or state variables without consulting the development team.
