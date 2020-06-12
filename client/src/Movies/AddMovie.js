import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const initial = {
  title: '',
  director: '',
  metascore: '',
  stars: ['', '', ''],
}

const AddMovie = ({ movieList, setMovieList }) => {
  const [movie, setMovie] = useState(initial);
  const { push } = useHistory();

  const handleChange = e => {
    if (e.target.name === 'stars') {
      const newStars = movie.stars.map((star, id) => {
        if (Number(e.target.id) === id) return e.target.value;
        return star;
      })
      setMovie({ ...movie, [e.target.name]: newStars, })
    } else {
      setMovie({ ...movie, [e.target.name]: e.target.value, })
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));

    push('/');
  }

  return (
    <form className="update-movie" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={movie.title}
        onChange={handleChange}
      />
      <input
        name="director"
        placeholder="Director"
        value={movie.director}
        onChange={handleChange}
      />
      <input
        name="metascore"
        placeholder="Metascore"
        value={movie.metascore}
        onChange={handleChange}
      />
      {movie.stars.map((star, id) => {
        return (
        <input
          key={id}
          name="stars"
          placeholder={`Star ${id + 1}`}
          id={id}
          value={star}
          onChange={handleChange}
        />)
      })}
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;