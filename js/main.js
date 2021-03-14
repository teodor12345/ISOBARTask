 
 
 
 $(document).ready(() => {

  var filterVlaues = {
    title: '',
    type: 'movie',
    year: 0,
    
  }

  $( ".form-control" ).change(function() {
    
    filterVlaues[$(this).data('name')] = $(this).val()  
    console.log(filterVlaues)
    getMoviesApi();

   
  });
  
  

 
  
    
    
    function getMoviesApi(){
      
      const api_key="f574ff9";
      const url = `http://www.omdbapi.com/?apikey=${api_key}&s=${filterVlaues.title}&type=${filterVlaues.type}&r=jsonx${filterVlaues.year !== 0 ? "&y=" + filterVlaues.year : '' }`; 
      axios.get(url)
        .then(function (response) {
          console.log(response)
          let movies = response.data.Search;
          let output = '';
          $.each(movies, (index, movie) => {
            console.log(movie);
            output+=`
              <div class="col-md-3">
                <div class="well text-center">
                  <img src="${movie.Poster}">
                  <h5>${movie.Title}</h5>
                  <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
              </div>
            `;
          });
    
          $('#movies').html(output);
    
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }

});



  


function movieSelected (id){
  sessionStorage.setItem('movieId',id );
  window.location = 'Movie.html';
  return false;
}


function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  // Make a request for a user with a given ID
  axios.get("http://www.omdbapi.com/" + movieId + "?api_key=f574ff9")
    .then(function (response) {
    let movie = response.data;
    //console.log(movie);
    let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
              <li class="list-group-item"><strong>Production Companies:</strong> ${movie.production_companies[0].name} min.</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
    `;
    $('#movie').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}


