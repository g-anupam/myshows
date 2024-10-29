import { useState } from 'react'
import {Link} from 'react-router-dom'
import './Heading.css'

function Heading() {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    // return (

    // )
}

export default Heading