import './Movies.css'
import logo from '../../assets/logo1.png';
import movie1 from '../../assets/movie1.jfif';
import movie2 from '../../assets/movie2.jfif';
import movie3 from '../../assets/movie3.jfif';
import movie4 from '../../assets/movie4.jfif';
import movie5 from '../../assets/movie5.jfif';
import movie6 from '../../assets/movie6.jfif';

function Movies() {
    return (
        <div className='homepage'>
            <header className='container'>
                <div className='top-bar'>
                    {/* <img src={logo} alt="Logo" className="logo" /> */}
                    <div className='search-container'>
                        <input type="text" placeholder="Movie in mind?" className="search-bar" />
                        <button className='search-button'>Search</button>
                    </div>
                    {/* <a href="/userprofile" className="login-link">
                    <i className="fas fa-user"></i> Login
                </a> */}
                </div>
                {/* <nav>
                <div id='menu'>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href='#Movies'>Movies</a></li>
                        <li><a href='#concerts'>Concerts</a></li>
                        <li><a href='#comedy'>Comedy</a></li>
                        <li><a href='#sports'>Sports</a></li>
                    </ul>
                </div>
            </nav> */}
            </header>

            {/* <h1>Welcome to MovieHub</h1> */}
            <h2 id="mheading">Recommended Movies</h2>

            <div className='recommended-movies'>
                <div className='movie-item'>
                    <img src={movie6} alt='Movie 6' className='poster' id="m1" />
                    <p className='movie-name' id="md1">Monte Carlo</p>
                </div>
                <div className='movie-item'>
                    <img src={movie2} alt='Movie 2' className='poster' id="m2" />
                    <p className='movie-name' id="md2">Herbie:Fully Loaded</p>
                </div>
                <div className='movie-item'>
                    <img src={movie3} alt='Movie 3' className='poster' id="m3" />
                    <p className='movie-name' id="md3">Terminator: Judgement Day</p>
                </div>
                <div className='movie-item'>
                    <img src={movie4} alt='Movie 4' className='poster' id="m4" />
                    <p className='movie-name' id="md4">Zindagi Na Milegi Dobara</p>
                </div>

            </div>
            {/* <h2>Concerts</h2> */}
        </div>
    )
}

export default Movies
