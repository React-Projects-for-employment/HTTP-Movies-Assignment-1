import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    setMovieList(movieList.filter(movie => Number(movie.id) !== Number(params.id)));
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${movie.id}`}>Update</Link>
      <Link to={`/`} onClick={deleteMovie}>Delete</Link>
    </div>
  );
}

export default Movie;