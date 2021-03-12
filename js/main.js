 
 /*
 //initial values
 const api_key="98325a9d3ed3ec225e41ccc4d360c817";
 
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

 
 $(document).ready(() => {
  $("#searchForm").on('submit', (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
  $("#searchFormByNumber").on('submit',(e)=>{
    e.preventDefault();
    let searchNumber=$("#serachNumber").val();
    getMovie(searchNumber);
  });
  $("#searchType").on('click',(e)=>{
    e.preventDefault();
    let selectType=$("#selectType").val();
    getMovie(selectType);
  });
  
  
});






function getMovies(searchText,searchNumber,selectType){
 
  axios.get("https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=" + searchText )
    .then(function (response) {
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output+=`
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.title}</h5>
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







// $('#picker').datetimepicker({
//   timepicker: false,
//   datepicker: true,
//   format: 'Y-m-d H:i', // formatDate
//   hours12: false,
//   step: 1
// })

  


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
 
 


