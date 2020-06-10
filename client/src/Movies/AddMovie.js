import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';

const initialState = {
  title: '',
  director: '',
  metascore: '',
  stars: ['', '', ''],
}

const AddMovie = ({movieList, setMovieList}) => {
  const [movie, setMovie] = useState(initialState);
  const {push} = useHistory();

  const handleChange = event => {
    if (event.target.name === 'stars') {
      const newStars = movie.stars.map((star, id) => {
        if (Number(event.target.id) === id) return event.target.value;
        return star;
      })
      setMovie({ ...movie, [event.target.name]: newStars})
    }
    else {setMovie({ ...movie, [event.target.name]: event.target.value})}
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then((response) => setMovieList(response.data))
      .catch((error) => console.log(error.response));
    push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={movie.title} onChange={handleChange} />
      <input name="director" placeholder="Director" value={movie.director} onChange={handleChange} />
      <input name="metascore" placeholder="Metascore" value={movie.metascore} onChange={handleChange} />
      {movie.stars.map((star, id) => {
        return (<input key={id} name="stars" placeholder={`Star ${id + 1}`} id={id} value={star} onChange={handleChange} />)})}
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;