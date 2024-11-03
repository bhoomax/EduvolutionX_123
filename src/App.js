



// // src/App.js
// import React, { useState } from 'react';
// import './styles.css';
// import Login from './components/Login'; // Adjust the path as necessary
// import MainComponent from './components/MainComponent'; // Your main content component

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [username, setUsername] = useState('');

//     const handleLoginSuccess = (user) => {
//         setIsLoggedIn(true);
//         setUsername(user); // Set the username when login is successful
//     };

//     return (
//         <div className="App">
//             {isLoggedIn ? (
//                 <MainComponent username={username} /> // Pass the username prop
//             ) : (
//                 <Login onLoginSuccess={handleLoginSuccess} />
//             )}
//         </div>
//     );
// }

// export default App;


// src/App.js
// src/App.js
import React, { useState } from 'react'; // Import React and useState hook for managing component state
import './styles.css'; // Import global CSS styles
import Login from './components/Login'; // Import Login component
import MainComponent from './components/MainComponent'; // Import main application component
import CreateAccount from './components/CreateAccount'; // Import CreateAccount component

// Main App component
function App() {
    // State to manage login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // State to store the logged-in username
    const [username, setUsername] = useState('');
    // State to track if an account has been successfully created
    const [isAccountCreated, setIsAccountCreated] = useState(false);

    // Function to handle successful login
    const handleLoginSuccess = (user) => {
        setIsLoggedIn(true); // Set login status to true
        setUsername(user); // Store the username after successful login
    };

    // Function to handle account creation success
    const handleAccountCreated = () => {
        setIsAccountCreated(true); // Set flag to true so we can redirect to login page
    };

    // Function to handle redirection to the login page
    const handleRedirectToLogin = () => {
        setIsAccountCreated(true); // Set flag to true to show the Login component
    };

    // Render the appropriate component based on login and account creation status
    return (
        <div className="App">
            {isLoggedIn ? (
                <MainComponent username={username} /> // Show main component if logged in
            ) : isAccountCreated ? (
                <Login onLoginSuccess={handleLoginSuccess} /> // Show login component after account creation
            ) : (
                <CreateAccount 
                    onAccountCreated={handleAccountCreated} // Pass function to handle account creation
                    onRedirectToLogin={handleRedirectToLogin} // Pass function to handle redirection to login
                />
            )}
        </div>
    );
}

export default App; // Export the App component for rendering in the root file
// This file provides core functionality for switching between login, main app, and account creation.
// Please avoid modifying these functions and state variables as they are essential for correct app navigation.

