import { useState } from "react";
import './ToggleTheme.css'

function ToggleTheme() {
    const [isDark, setIsDark] = useState(true)

    const changeTheme = () => {
        //setIsDark(prev => !prev)  //upon doing this the isDark field isnt updated immediately
        //and hence the next lines of code will still end up using the old val of isDark, and
        //this is because reacts state updates are async
        setIsDark(prev => {
            const newTheme = !prev
            document.body.classList.toggle('dark-theme', newTheme)
            document.body.classList.toggle('light-theme', !newTheme)
            return newTheme

        })
        // if (isDark)
        //     document.body.classList.toggle('dark-theme')
        // else
        //     document.body.classList.toggle('light-theme')
 
    }//so once the func is called then react will actually start implementing the scheduled 
    //things to perform, in this case exec of setIsDark() state update func, so to bypass all
    //this, we can mention the change funcionality which uses the isDark field within the 
    //state updator itself so that whenever its rendered, the intended functionalities can also
    //be rendered 

    return (
        <div id="toggle">
            <button id="btoggle" onClick={changeTheme}>{isDark ? "Light" : "Dark"}</button>
        </div>
    )
}

export default ToggleTheme