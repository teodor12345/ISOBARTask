 
 
 
 $(document).ready(() => {

  var filterVlaues = {
    title: '',
    type: 'movie',
    year: 0
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
            console.log(movie)
            output+=`
              <div class="col-md-3">
                <div class="well text-center">
                  <img src="${movie.Poster}">
                  <h5>${movie.Title}</h5>
                  <a onclick="('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
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



  




 


