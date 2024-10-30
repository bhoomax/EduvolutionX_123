



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
import React, { useState } from 'react';
import './styles.css';
import Login from './components/Login';
import MainComponent from './components/MainComponent';
import CreateAccount from './components/CreateAccount';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isAccountCreated, setIsAccountCreated] = useState(false); // Track account creation

    const handleLoginSuccess = (user) => {
        setIsLoggedIn(true);
        setUsername(user); // Set the username when login is successful
    };

    const handleAccountCreated = () => {
        setIsAccountCreated(true); // Mark that the account was created, so we can redirect to login
    };

    const handleRedirectToLogin = () => {
        setIsAccountCreated(true); // Set flag to true to show the Login component
    };

    return (
        <div className="App">
            {isLoggedIn ? (
                <MainComponent username={username} /> // Show main component when logged in
            ) : isAccountCreated ? (
                <Login onLoginSuccess={handleLoginSuccess} /> // Show login after account creation
            ) : (
                <CreateAccount 
                    onAccountCreated={handleAccountCreated}
                    onRedirectToLogin={handleRedirectToLogin} // Pass the redirection function
                />
            )}
        </div>
    );
}

export default App;
