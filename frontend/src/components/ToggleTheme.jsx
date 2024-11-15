import { useState, useEffect } from "react";
import './ToggleTheme.css';

function ToggleTheme() {
    // Check the initial theme based on the body class
    const initialThemeIsDark = document.body.classList.contains('dark-theme');
    const [isDark, setIsDark] = useState(initialThemeIsDark);

    useEffect(() => {
        // Set the theme when the component mounts
        document.body.classList.toggle('dark-theme', isDark);
        document.body.classList.toggle('light-theme', !isDark);
    }, [isDark]);

    const changeTheme = () => {
        setIsDark(prev => {
            const newTheme = !prev;
            document.body.classList.toggle('dark-theme', newTheme);
            document.body.classList.toggle('light-theme', !newTheme);
            return newTheme;
        });
    };

    return (
        <div id="toggle">
            <button id="btoggle" onClick={changeTheme}>
                {isDark ? "Light" : "Dark"}
            </button>
        </div>
    );
}

export default ToggleTheme;
