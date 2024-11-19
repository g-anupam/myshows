import { useState, useEffect } from "react";
import './ToggleTheme.css';

function ToggleTheme() {
    const initialThemeIsDark = document.body.classList.contains('dark-theme');
    const [isDark, setIsDark] = useState(initialThemeIsDark);

    useEffect(() => {
        // Toggle the theme on the body element
        document.body.classList.toggle('dark-theme', isDark);
        document.body.classList.toggle('light-theme', !isDark);
    }, [isDark]);

    const changeTheme = () => {
        setIsDark(prev => !prev);
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
