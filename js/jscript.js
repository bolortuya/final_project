function init(e) {
  var button = document.getElementById('btn');
	var email = document.getElementById("email");

  if(Name.value == "") {
		alert("Please enter the name of the movie!");
    e.preventDefault();
		return false;
	}
  if(parseInt(Rating.value) > 5 || parseInt(Rating.value) < 1) {
		alert("Please enter a rating between 1 and 5!");
    e.preventDefault();
		return false;
	}
  if(Review.value == "") {
		alert("Please write a review!");
    e.preventDefault();
		return false;
	}
}
