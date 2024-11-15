import './Movies.css';
import logo from '../../assets/logo1.png';
import movie1 from '../../assets/movie1.jfif';
import movie2 from '../../assets/movie2.jfif';
import movie3 from '../../assets/movie3.jfif';
import movie4 from '../../assets/movie4.jfif';
import movie5 from '../../assets/movie5.jfif';
import movie6 from '../../assets/movie6.jfif';
import movie7 from '../../assets/movie7.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Movies() {
    const moviesList = [
        { name: 'Monte Carlo', image: movie7, link: '/monte-carlo' },
        { name: 'Herbie: Fully Loaded', image: movie2 },
        { name: 'Terminator: Judgement Day', image: movie3 },
        { name: 'Zindagi Na Milegi Dobara', image: movie4 },
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
        </div>
    );
}

export default Movies;
