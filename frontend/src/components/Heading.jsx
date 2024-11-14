import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Heading.css';

function Heading() {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
<<<<<<< HEAD
        setIsHover(true)
    }
=======
        setIsHover(true);
    };
>>>>>>> 1793ae84c8701f3f24db47d47aabb0abffb84b08

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <div className="contentdiv">
            <Link to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <h1 id="heading">TicketVerse</h1>
            </Link>
        </div>
    );
}

export default Heading;
