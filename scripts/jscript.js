function init(e) {
  var button = document.getElementById('btn');
	var email = document.getElementById("email");

  if(movieName.value == "") {
		alert("Please enter the name of the movie!");
    e.preventDefault();
		return false;
	}
  if(movieRating.value > 10 || Rating.value < 1) {
		alert("Please enter a rating between 1 and 5!");
    e.preventDefault();
		return false;
	}
  if(movieDescription.value == "") {
		alert("Please write a review!");
    e.preventDefault();
		return false;
	}
}

function displayAllProducts() {
    const Url='http://localhost:3000/movies';
    $.ajax({
        url: Url,
        method:"GET",
        success: result => {
            $('#tbody tr').remove();
            $.each(result.movies, (i, item) => {
                var eachrow = "<tr>"
                            + "<td>" + item.movie.name + "</td>"
                            + "<td>" + item.movie.rating + "</td>"
                            + "<td>" + item.movie.description + "</td>"
                            + "<td>" + item.movie._id + "</td>"
                            + "</tr>";
                $('#tbody').append(eachrow);
            })
        },
        error: error =>{
            console.log(`Error ${error}`)
        }
    });
};

function postMovie() {
    document.getElementById("movieSelect").addEventListener("click", function(event){
        event.preventDefault()
    });
    var m = new Movie(
        document.getElementById('movieName').value,
        document.getElementById('movieRating').value,
        document.getElementById('movieDescription').value
    );
    const Url3='http://localhost:3000/products';
    $.ajax({
        url: Url3,
        method:"POST",
        data: m,
        success: result => {
            console.log(result);
            document.getElementById("movieCreate").reset();
        },
        error: error =>{
            console.log(`Error ${error}`)
        }
    });
}

function Movie(mName,mRating,mDescription){
    this.name = pName;
    this.mRating = mRating;
    this.mDescription = mDescription;
}
