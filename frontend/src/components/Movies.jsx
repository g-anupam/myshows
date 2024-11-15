import './Movies.css';
import movie7 from '../../assets/movie7.jpg';
import movie8 from '../../assets/movie8.jpg';
import movie9 from '../../assets/movie9.jpg';
import movie10 from '../../assets/movie10.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Montecarlo from "../pages/Movie1.jsx";

function Movies() {
    const moviesList = [
        { name: 'Monte Carlo', image: movie7, link: '/monte-carlo' },
        { name: 'Herbie: Fully Loaded', image: movie8 },
        { name: 'Terminator: Judgement Day', image: movie9 },
        { name: 'Zindagi Na Milegi Dobara', image: movie10 },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMovies, setFilteredMovies] = useState(moviesList);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = moviesList.filter(movie =>
            movie.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredMovies(filtered);
    };

    return (
        <div className='homepage'>
            <header className='container'>
                <div className='top-bar'>
                    <div className='search-container'>
                        <input
                            type="text"
                            placeholder="Movie in mind?"
                            className="search-bar"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button className='search-button'>
                            <i className='fas fa-search'></i>
                        </button>
                    </div>
                </div>
            </header>

            <h2 id="mheading">Recommended Movies</h2>

            <div className='recommended-movies'>
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie, index) => (
                        movie.link ? (
                            <Link to={movie.link} key={index} className="movie-item">
                                <div>
                                    <img src={movie.image} alt={movie.name} className="poster" />
                                    <p className="movie-name">{movie.name}</p>
                                </div>
                            </Link>
                        ) : (
                            <div key={index} className='movie-item'>
                                <img src={movie.image} alt={movie.name} className='poster' />
                                <p className='movie-name'>{movie.name}</p>
                            </div>
                        )
                    ))
                ) : (
                    <p className="no-results">Movie not found</p>
                )}
            </div>
            <div className="button-container">
                <Link to="/monteCarlo" className="special-button">
                  Go to Tester
                </Link>
            </div>
        </div>
    );
}

export default Movies;
