import { useEffect, useState } from 'react';
import './FirstName.css';

function FirstName() {
    const [firstName, setFirstName] = useState(''); 

    const updateFirstName = () => {
        const storedFirstName = sessionStorage.getItem('userFirstName');
        setFirstName(storedFirstName || '');
    };

    useEffect(() => {
        // Initial load
        updateFirstName();

        // Custom event listener for sessionStorage changes
        const handleCustomStorageChange = () => {
            updateFirstName();
        };

        window.addEventListener('sessionStorageUpdated', handleCustomStorageChange);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('sessionStorageUpdated', handleCustomStorageChange);
        };
    }, []);

    return (
        <div id="greeting">
            {firstName && <p>Welcome, {firstName}!</p>}
        </div>
    );
}

export default FirstName;
