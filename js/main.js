 
 
 // define the filters outside of scoop
 //3 filters Search by name, Serach by Type,Serach by year
 $(document).ready(() => {

  var filterVlaues = {
    
    title: '',
    type: 'movie',
    year: 0,
    
    
  }
//use the change function
  $( ".form-control" ).change(function() {
    
    filterVlaues[$(this).data('name')] = $(this).val()  
    console.log(filterVlaues)
    getMoviesApi();

   
  });
  
  

 
  
    //Define Function with const API key from mail,define cost url with filter values,use axios to get url,function response where we show the results
    //let the output show Movie Poster,Movie tittle,linke to the imbd 
    
    function getMoviesApi(){
      
      const api_key="f574ff9";
      const url = `http://www.omdbapi.com/?apikey=${api_key}&s=${filterVlaues.title}&type=${filterVlaues.type}&r=jsonx${filterVlaues.year !== 0 ? "&y=" + filterVlaues.year : '' }`; 
      axios.get(url)
        .then(function (response) {
          console.log(response)
          let movies = response.data.Search;
          let output = '';
          $.each(movies, (index, movie) => {
            console.log(movie)
            output+=`
              <div class="col-md-3">
                <div class="well text-center">
                  <img src="${movie.Poster}">
                  <h5>${movie.Title}</h5>
                  <a onclick=${movie.imdbID} class="btn btn-primary" href="https://www.imdb.com/">IMBD VIEW</a>
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



  




 


