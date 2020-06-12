import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

 const initial = {
  title: '',
  director: '',
  metascore: '',
  stars: ['', '', ''],
}

const UpdateMovie = ({ movieList, setMovieList }) => {
  const [ movie, setMovie ] = useState(initial);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id])

  const handleChange = e => {
    if(e.target.name === 'stars') {
      const newStars = movie.stars.map((star, id) => {
        if (Number(e.target.id) === id) return e.target.value;
        return star;
      })
      setMovie({...movie, [e.target.name]: newStars, })
    } else {
      setMovie({ ...movie, [e.target.name]: e.target.value, })
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));

    const newMovieList = movieList.map(e => {
      if(Number(e.id) === Number(params.id)) return movie;
      return e;
    });

    setMovieList(newMovieList);
    push('/');
  }

  return (
    <form className="update-movie" onSubmit={handleSubmit}>
      <input
        name="title"
        value={movie.title}
        onChange={handleChange}
      />
      <input
        name="director"
        value={movie.director}
        onChange={handleChange}
      />
      <input
        name="metascore"
        value={movie.metascore}
        onChange={handleChange}
      />
      {movie.stars.map((star, id) => {
        return (<input
          key={id}
          name="stars"
          id={id}
          value={star}
          onChange={handleChange}
        />)
      })}
      <button>Update</button>
    </form>
  );
}

export default UpdateMovie;