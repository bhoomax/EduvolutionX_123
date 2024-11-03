import React, { useState, useEffect, useRef } from 'react'; // Import React, useState, useEffect, and useRef hooks
import 'onsenui/css/onsenui.css'; // Import Onsen UI core styles for consistent UI elements
import 'onsenui/css/onsen-css-components.min.css'; // Import Onsen UI component-specific styles
import './style.css'; // Import custom styles for this component
import logo from './logo.png'; // Import the application logo image
import lampSquareImage from './Lamp&Square.jpg'; // Import specific image for content display

// Define a constant `topicsPages` containing content for various topics and pages
// Each topic has an array of HTML strings for different pages
const topicsPages = {
    licht: [
        // Page content with HTML structure for 'licht' topic
        '<div class="topic-content"><h1>5.1 Licht (Light)</h1> <ul> <li>Lichtbronnen (Light sources)</li> <li>Directe en indirecte verlichting (Direct and indirect lighting)</li> <li>Lichtsnelheid (Speed of light)</li> <li>Lichtbundels (Beams of light)</li> <li>Schaduw (Shadow)</li> <li>Schaduw Kernschaduw en halfschaduw (Core shadow and partial shadow)</li> </ul> </div>',
        
        `<div class="topic-content"> 
            <h1>Lichtbronnen (Light sources)</h1> 
            <ul> <li>An object that emits light is a light source</li> </ul> 
            <p>There are two types of light sources</p> 
            <div class="but"> 
                <div> 
                    <button>Natural Lights</button> 
                    <div id="sun-image" class="image"> 
                        <img src="sun.png" alt="Sun Image"> 
                    </div> 
                </div> 
                <div> 
                    <button>Artificial Lights</button> 
                    <div id="street-lamp-image" class="image"> 
                        <img src="bulb.png" alt="Street Lamp Image"> 
                    </div> 
                </div> 
            </div> 
        </div>`, 
        
        '<div class="topic-content"> <h1>The Key Elements for a Shadow to Form</h1> <ul> <li> <div class="info-box"> <strong>Light Source:</strong> The origin of the light, such as the sun, a lamp, or a flashlight. </div> </li> <li> <div class="info-box"> <strong>Opaque Object:</strong> An object that does not allow light to pass through it. Examples include a wall, a person, or a piece of furniture. </div> </li> <li> <div class="info-box"> <strong>Screen/Surface:</strong> A surface where the light is blocked by the opaque object, creating a dark area (shadow). </div> </li> </ul> </div>',
        
        // This page includes a reference to an image (lampSquareImage) and explains shadow formation
        `<div className="topic-content"> 
            <h1>Do you see that there is light and an opaque object? Yet, there is no shadow formed. Why?</h1> 
        </div> 
        <p id="response" className="response-style" style={{ display: 'none', marginTop: '10px' }}></p>  
        <img src="" alt="Explanation image" className="resized-image" />`,
        
        // Further pages on opaque and transparent objects, including images and examples
        '<div class="topic-content"> <h1>5.2 Opaque and Transparent Objects</h1> <ul> <li>Opaque Objects <ul> <li>Definition</li> <li>Example Images</li> </ul> </li> <li>Transparent Objects <ul> <li>Definition</li> <li>Example Images</li> </ul> </li> </ul> </div>',
        
        '<div class="topic-content"> <h1>Opaque and Transparent Objects</h1> <h2>Opaque Objects</h2> <p>An opaque object is one that does not allow light to pass through. It blocks light completely. Examples include:</p> <ul> <li><img src="opaque_example1.jpg" alt="Opaque Example 1" width="200"></li> <li><img src="opaque_example2.jpg" alt="Opaque Example 2" width="200"></li> </ul> <h2>Transparent Objects</h2> <p>A transparent object is one that allows light to pass through it, making it possible to see objects on the other side. Examples include:</p> <ul> <li><img src="transparent_example1.jpg" alt="Transparent Example 1" width="200"></li> <li><img src="transparent_example2.jpg" alt="Transparent Example 2" width="200"></li> </ul></div>',
        
        '<div class="topic-content"> <h1>5.3 Moving the Object and the Light Source</h1> <p>Drag an object on the slide to see how its shadow changes. Observe how the shadow behaves when the position of the light source is adjusted.</p> </div>',
        
        '<div class="topic-content"> <h1>5.4 Greater Light Source</h1> <h2>Core Shadow and Partial Shadow</h2> <p>Explore how shadows change with a larger light source. Notice the differences between the core shadow and partial shadow.</p> <img src="path/to/your/image.jpg" alt="Example of core shadow and partial shadow"> </div>'
    ],
    kleuren: [
        // Color topic pages
        '<div class="topic-content"><h1>5.2 Kleuren (Colors)</h1><ul> <li>Kleuren in licht (Colors in light)</li> <li>Ultraviolet (Ultraviolet)</li> <li>Infrarood (Infra-red)</li> <li>Kleuren zien (Seeing colors)</li> <li>Kleur van de verlichting (Color of the lighting)</li> </ul></div>',
        '<div class="topic-content"><h1>Kleuren - Page 2</h1><img src="kleuren2.jpg" alt="Kleuren Image 2"><button onclick="alert(\'Button 2 clicked\')">Click Me</button></div>',
        '<div class="topic-content"><h1>Kleuren - Page 3</h1><img src="kleuren3.jpg" alt="Kleuren Image 3"><button onclick="alert(\'Button 3 clicked\')">Click Me</button></div>'
    ],
    spiegels: [
        // Mirrors topic pages
        '<div class="topic-content"><h1>5.3 Spiegels (Mirrors)</h1><ul> <li>Terugkaatsing Spiegelwet (Reflection of the Mirror Act)</li> <li>Spiegelbeeld (Reflection)</li> <li>Virtueel beeld (Virtual image)</li> </ul></div>',
        '<div class="topic-content"><h1>Spiegels - Page 2</h1><img src="spiegels2.jpg" alt="Spiegels Image 2"><button onclick="alert(\'Button 2 clicked\')">Click Me</button></div>',
        '<div class="topic-content"><h1>Spiegels - Page 3</h1><img src="spiegels3.jpg" alt="Spiegels Image 3"><button onclick="alert(\'Button 3 clicked\')">Click Me</button></div>'
    ],
    lenzen: [
        // Lenses topic pages
        '<div class="topic-content"><h1>5.4 Lenzen (Lenses)</h1><ul> <li>Bolle lens (Convex lens)</li> <li>Holle lens (Concave lens)</li> <li>Brandpuntsafstand (Focal length)</li> <li>Reëel beeld (Real image)</li> <li>Voorwerpsafstand (Object distance)</li> <li>Beeldafstand (Image distance)</li> <li>Camera (Camera)</li> <li>Diaprojector en beamer (Slide projector and projector)</li> <li>Vergroting (Magnification)</li> </ul></div>',
        '<div class="topic-content"><h1>Lenzen - Page 2</h1><img src="lenzen2.jpg" alt="Lenzen Image 2"><button onclick="alert(\'Button 2 clicked\')">Click Me</button></div>',
        '<div class="topic-content"><h1>Lenzen - Page 3</h1><img src="lenzen3.jpg" alt="Lenzen Image 3"><button onclick="alert(\'Button 3 clicked\')">Click Me</button></div>'
    ],
    beeld: [
        // Constructing an image topic pages
        '<div class="topic-content"><h1>5.5 Een beeld construeren (Constructing an image)</h1><ul> <li>Constructiestralen (Construction rays)</li> <li>Constructie van het beeld (Construction of the image)</li> </ul></div>',
        '<div class="topic-content"><h1>Beeld - Page 2</h1><img src="beeld2.jpg" alt="Beeld Image 2"><button onclick="alert(\'Button 2 clicked\')">Click Me</button></div>',
        '<div class="topic-content"><h1>Beeld - Page 3</h1><img src="beeld3.jpg" alt="Beeld Image 3"><button onclick="alert(\'Button 3 clicked\')">Click Me</button></div>'
    ],
    oog: [
        // Eye topic pages
        '<div class="topic-content"><h1>5.6 Het oog</h1><ul> <li>Zien met je ogen (See with your eyes)</li> <li>Nabijheidspunt (Proximity point)</li> <li>Accommoderen (Accommodate)</li> <li>Gezichtsveld (Field of view)</li> <li>Lichtsnelheid (Speed of light)</li> <li>Bril en contactlenzen (Glasses and contact lenses)</li> <li>Bijziendheid (Myopia)</li> <li>Verziendheid (Farsightedness)</li> </ul></div>',
        '<div class="topic-content"><h1>Oog - Page 2</h1><img src="oog2.jpg" alt="Oog Image 2"><button onclick="alert(\'Button 2 clicked\')">Click Me</button></div>',
        '<div class="topic-content"><h1>Oog - Page 3</h1><img src="oog3.jpg" alt="Oog Image 3"><button onclick="alert(\'Button 3 clicked\')">Click Me</button></div>'
    ]
};
// This structure is essential for loading topics and pages dynamically. Avoid modifying without reviewing the overall content loading logic.



const MainComponent = ({ username }) => {
    // State variables for managing current topic, page, notes, and UI elements
    const [currentTopic, setCurrentTopic] = useState(null); // Track the selected topic
    const [currentPage, setCurrentPage] = useState(0); // Track the current page in the selected topic
    const [response, setResponse] = useState({ text: '', color: '', backgroundColor: '' }); // Stores response feedback
    const [showButtons, setShowButtons] = useState(false); // Controls visibility of answer buttons
    const [notes, setNotes] = useState(''); // Stores user notes
    const [isNoteInputVisible, setIsNoteInputVisible] = useState(true); // Toggles note input visibility
    const textareaRef = useRef(null); // Ref for note textarea for direct DOM manipulation
    const [lastSavedNote, setLastSavedNote] = useState(''); // Track last saved note to prevent duplicate saves

    // Fetch the latest notes from the server when the component loads or when the username changes
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`http://localhost:3001/notes/${username}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    // Display only the latest note content, fetched in descending order
                    const latestNote = data[0].note;
                    console.log("Fetched latest note:", latestNote); // Debug log
                    setNotes(latestNote); // Display latest note
                    setLastSavedNote(latestNote); // Track last saved note
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        if (username) {
            fetchNotes(); // Fetch notes if user is logged in
        }
    }, [username]); // Dependency array with username ensures this runs when username changes

    // Save note to the server, avoiding empty or duplicate saves
    const handleSaveNote = async () => {
        const note = textareaRef.current.value.trim(); // Capture trimmed text from textarea

        if (note === '' || note === lastSavedNote) return; // Prevent saving empty or duplicate notes

        try {
            const response = await fetch('http://localhost:3001/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, note }), // Send username and note in request
            });

            const data = await response.json();

            if (data.success) {
                console.log("Note saved successfully:", note); // Debug log
                setLastSavedNote(note); // Track last saved note
                setNotes(note); // Update displayed notes with new content
                textareaRef.current.focus(); // Keep focus on textarea
                textareaRef.current.selectionStart = textareaRef.current.selectionEnd = note.length; // Move cursor to end
            } else {
                console.error('Failed to save note:', data.error); // Log failure
            }
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    // Load specific elements on particular pages based on topic and page selection
    const loadPage = () => {
        if (currentTopic) {
            setShowButtons(currentTopic === 'licht' && currentPage === 3); // Show buttons on specific page and topic
        }
    };

    useEffect(() => {
        loadPage(); // Load elements based on topic and page
    }, [currentTopic, currentPage]); // Dependency array ensures this runs when topic or page changes

    // Event handlers for navigating through topics and pages
    const handleTopicClick = (topic) => {
        setCurrentTopic(topic); // Set selected topic
        setCurrentPage(0); // Reset to the first page of the new topic
    };

    const handleNextPage = () => {
        if (currentPage < topicsPages[currentTopic].length - 1) {
            setCurrentPage(currentPage + 1); // Advance to the next page if within bounds
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1); // Go back to the previous page if within bounds
        }
    };

    const handlePageClick = (pageIndex) => {
        setCurrentPage(pageIndex); // Navigate to a specific page by index
    };

    // Handlers for correct/incorrect answer feedback
    const handleYesClick = () => {
        setResponse({
            text: "Correct!",
            color: 'green',
            backgroundColor: 'rgba(200, 255, 200, 0.5)',
        });
        setTimeout(() => {
            setCurrentPage(6); // Move to next page after feedback
            setResponse({ text: '', color: '', backgroundColor: '' }); // Reset response
        }, 2000);
    };

    const handleNoClick = () => {
        setResponse({
            text: "Incorrect!",
            color: 'red',
            backgroundColor: 'rgba(255, 200, 200, 0.5)',
        });
        setTimeout(() => {
            setCurrentPage(4); // Move to a specific page after feedback
            setResponse({ text: '', color: '', backgroundColor: '' }); // Reset response
        }, 2000);
    };

    // Toggle visibility of note input field
    const handleToggleNoteInput = () => {
        setIsNoteInputVisible(!isNoteInputVisible);
    };

    return (
        <div className="container">
            <div className="sidebar">
                <a href="#profile" className="profile-link">
                    <div className="profile">
                        <img src="pp.png" alt="Profile Picture" /> {/* Profile picture display */}
                        {username && <p>{username}</p>} {/* Display username if logged in */}
                    </div>
                </a>
                <div className="topics">
                    <div className="topik">
                        <img src="c.png" alt="" />
                        <p className="topics-title">Topics</p>
                    </div>
                    <ul id="topicLinks">
                        {Object.keys(topicsPages).map((topic) => (
                            <li key={topic}>
                                <a href="#" className="topic-link" onClick={() => handleTopicClick(topic)}>
                                    {topic.replace(/^\w/, (c) => c.toUpperCase())} {/* Capitalize topic names */}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="setlog">
                    <div className="logo-settings-container">
                        <div className="logo">
                            <img src={logo} alt="Logo" />
                        </div>
                        <a href="#settings">
                            <div className="settings">
                                <img src="setting.png" alt="Settings" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="main">
                <div className="header">
                    <p>Welcome {username || "User"} to my virtual classroom</p> {/* Header with welcome message */}
                </div>
                <div className="content" id="content">
                    {currentTopic && (
                        <div dangerouslySetInnerHTML={{ __html: topicsPages[currentTopic][currentPage] }} /> /* Display page content */
                    )}
                    {showButtons && ( // Show answer buttons on specific pages
                        <div>
                            <button className="button button-yes" onClick={handleYesClick}>
                                A) The light is not blocked by the opaque object.
                            </button>
                            <button className="button button-no" onClick={handleNoClick}>
                                B) The object is transparent and allows light to pass through.
                            </button>
                            {response.text && (
                                <p className="response-style" style={{
                                    color: response.color,
                                    backgroundColor: response.backgroundColor,
                                    display: response.text ? 'block' : 'none'
                                }}>
                                    {response.text}
                                </p>
                            )}
                        </div>
                    )}
                </div>
                <div className="pagination">
                    <button className="prev" onClick={handlePrevPage}>Prev</button>
                    <div className="pages" id="pagination">
                        {Array.from({ length: topicsPages[currentTopic]?.length || 0 }, (_, index) => (
                            <button
                                key={index}
                                className={index === currentPage ? 'active' : ''}
                                onClick={() => handlePageClick(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button className="next" onClick={handleNextPage}>Next</button>
                </div>
            </div>

            {/* Note Section */}
            <div className="note">
                <h2>Your Notes:</h2>
                <textarea
                    ref={textareaRef}
                    className="textarea textarea--transparent"
                    placeholder="Type your note here..."
                    rows="4"
                    value={notes} // Bind textarea value to notes state
                    onChange={(e) => setNotes(e.target.value)} // Update notes state on change
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        backgroundColor: '#ffeb3b',
                        color: 'black',
                        fontSize: '1em',
                        marginTop: '10px',
                        outline: 'none',
                    }}
                ></textarea>
                <button onClick={handleSaveNote} className="btn hidden" style={{ marginTop: '10px' }}>Save Note</button>
            </div>
        </div>
    );
};

export default MainComponent; // Export the component for use in the application
// This file is essential for displaying topic content, handling navigation, and managing user notes.
// Please do not modify the component's functions, state, or structure without consulting the development team.
