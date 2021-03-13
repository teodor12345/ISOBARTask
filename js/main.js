 
 /*
 //initial values
 
 const url="https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817";
 
 //selecting elements from DOOM
 const buttonElement=document.querySelector('#search');
 const inputElement=document.querySelector('#select');


 buttonElement.onclick= function (event){
   event.preventDefault();
   const value = inputElement.value;
   const newUrl= url +'&query='+ value;
  
     
    fetch( newUrl)

     .then((res)=>res.json())
     .then((data)=>{
       console.log('Data',data);
     })
     .catch((error)=>{
       console.log('Erro:',error);
     });
     console.log('Value' ,value)

   
 
 }*/

 

//  $('#searchNumber').datetimepicker({
//   timepicker: false,
//   datepicker: true,
//   format: 'Y-m-d H:i', // formatDate
//   hours12: false,
//   step: 1
// })

 
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
      const Image_URL="https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
      const api_key="f574ff9";
      const url = `http://www.omdbapi.com/?apikey=${api_key}&s=${filterVlaues.title}&type=${filterVlaues.type}&r=jsonx${filterVlaues.year !== 0 ? "&y=" + filterVlaues.year : '' }`; 
      // console.log(url)
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
                  <img src=${Image_URL + movie.Poster}">
                  <h5>${movie.Title}</h5>
                  <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
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



  // $("#searchFormByNumber").on('submit',(e)=>{
  //   e.preventDefault();
  //   getMoviesApi (searchNumber);
  // });
  // $("#search").on('click',(e)=>{
  //   e.preventDefault();
  //   getMoviesApi(selectType);
  // }); 







  


function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}


function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=98325a9d3ed3ec225e41ccc4d360c817")
    .then(function (response) {
    let movie = response.data;
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
 
 


