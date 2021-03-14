 
 
 
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
                  <a onclick="movieSelected('${movie.i}')" class="btn btn-primary" href="#">Movie Details</a>
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



  



function movieSelected(id){
  sessionStorage.setItem('movieId',id );
  window.location = 'movie.html';
  return false;
}


function getMovieInfo(){
  const api_key="f574ff9";
  const url = `http://www.omdbapi.com/?apikey=${api_key}`; 
  axios.get( url  )
    .then(function (response) { 
    let movie = response.data;
    let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Released:</strong> ${movie.Release_date}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
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
 
 


