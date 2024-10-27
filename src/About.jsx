import { useState } from 'react'
import './About.css'

function About() {
    const [linkDisabled, setLinkDisabled] = useState(true)

    const clickFunction = () => {
        var options = document.querySelector("#options")
        var moreButton = document.querySelector("#b1")
        options.style.opacity = options.style.opacity === '1' ? '0' : '1' 
    }
 
    return ( //the href thing is done so that once the fields are not visible, all their links 
        //become undefined effectively making it useless, and the fields do point to some other
        //page defined later
        <div id="rightdiv">
            <button id="b1" onClick={clickFunction}>...</button>
            <div id="options">
                <h3><a href={linkDisabled ? undefined : "#"}>Sign in</a></h3> 
                <h3><a href={linkDisabled ? undefined : "#"}>Booked shows</a></h3>
                <h3><a href={linkDisabled ? undefined : "#"}>About us</a></h3>
            </div>
        </div>
    )
}

export default About