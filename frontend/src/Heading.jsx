import { useState } from 'react'
import {Link} from 'react-router-dom'
import './Heading.css'

function Heading() {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
        // alert('NIGGA')
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    const handleMouseClick = () => {
        setIsHover(true)
    }

    return (
        <div className="contentdiv">
            <Link to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <h1 id="heading">
                    TicketVerse
                </h1>
            </Link>
        </div>
    )
}

export default Heading