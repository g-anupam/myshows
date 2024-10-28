import { useState } from 'react'
import './rightButton.css'

function RightButton() {
    const [linkDisabled, setLinkDisabled] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    const clickFunction = () => {
        // var options = document.querySelector("#options")
        // if (options.style.opacity == 1) {
        //     options.style.opacity = 0
        //     setLinkDisabled(!linkDisabled)
        // }else {
        //     options.style.opacity = 1
        //     setLinkDisabled(!linkDisabled)
        // }
        setLinkDisabled(prev => !prev)
        setIsVisible(prev => !prev)
    }
 
    return ( //the href thing is done so that once the fields are not visible, all their links 
        //become undefined effectively making it useless, and the fields do point to some other
        //page defined later
        <div id="rightdiv">
            <button id="b1" onClick={clickFunction}>...</button>
            <div id="options" style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease', textAlign:'left', paddingRight: '15px'}}>
                <h3><a className="rightlink" href={linkDisabled ? undefined : "#"}>Sign in</a></h3> 
                <h3><a className="rightlink" href={linkDisabled ? undefined : "#"}>Booked shows</a></h3>
                <h3><a className="rightlink" href={linkDisabled ? undefined : "../index.html#about"}>About us</a></h3>
            </div>
        </div>
    )
}

export default RightButton