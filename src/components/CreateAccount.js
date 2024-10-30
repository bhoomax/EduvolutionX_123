import React, { useState } from 'react';
import './CreateAccount.css';
import bg from './il.png';
function CreateAccount({ onAccountCreated, onRedirectToLogin }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('Account created successfully');
                onAccountCreated(); // Redirect to login
            } else {
                setStatus(data.error || 'Failed to create account');
            }
        } catch (error) {
            console.error('Sign-up error:', error);
            setStatus('An error occurred. Check the console for details.');
        }
    };

    return (
        <div className="container">
            <div className="left">
                <img src={bg} alt="Desert Landscape" />
                <a href="#" className="back-to-website">Back to website →</a>
            </div>
            <div className="right">
                <h1>Create an account</h1>
                <p>Already have an account? <a href="#" onClick={onRedirectToLogin}>Log in</a></p>
                <form onSubmit={handleSignUp}>
                    <div className="name-fields">
                        <div className="form-group">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" id="terms" name="terms" required />
                        <span>I agree to the <a href="#">Terms & Conditions</a></span>
                    </div>
                    <button type="submit" className="btn">Create account</button>
                </form>
                {status && <p>{status}</p>}
            </div>
        </div>
    );
}

export default CreateAccount;
