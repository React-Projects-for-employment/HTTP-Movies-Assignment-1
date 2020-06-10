import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import axios from 'axios';

 const initialState = {
  title: '',
  director: '',
  metascore: '',
  stars: ['', '', ''],
}

const UpdateMovie = ({movieList, setMovieList}) => {
  const [movie, setMovie] = useState(initialState);
  const params = useParams();
  const {push} = useHistory();

  const getMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.log(error.response));
  };

  useEffect(() => {getMovie(params.id);}, [params.id])

  const handleChange = event => {
    if(event.target.name === 'stars') {
      const newStars = movie.stars.map((star, id) => {
        if (Number(event.target.id) === id) return event.target.value;
        return star;
      })
      setMovie({...movie, [event.target.name]: newStars})
    }
    else {setMovie({ ...movie, [event.target.name]: event.target.value})}
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response));

    const newMovieList = movieList.map(event => {
      if(Number(event.id) === Number(params.id)) return movie;
      return event;
    });
    setMovieList(newMovieList);
    push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={movie.title} onChange={handleChange} />
      <input name="director" value={movie.director} onChange={handleChange} />
      <input name="metascore" value={movie.metascore} onChange={handleChange} />
      {movie.stars.map((star, id) => {
        return (<input key={id} name="stars" id={id} value={star} onChange={handleChange} />)
      })}
      <button>Update Movie</button>
    </form>
  );
}

export default UpdateMovie;