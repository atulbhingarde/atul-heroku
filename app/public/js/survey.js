$(function(){
  const validateForm = function () {
    let isValid = true;

    // Using jQuery's each method, loop through the inputs
    // Sets isValid to false if any are empty
    $('input').each(function() {
      if (!$(this).val()) {
        isValid = false;
      }
    });

    // Using jQuery's each method, loop through the select elements
    // Sets isValid to false if any are unchosen
    $('.custom-select').each(function(i, element) {
      if (!$(this).val()) {
        isValid = false;
      }
    });

    return isValid;
  }

  const displayModal = function(data) {

    // Grab the result from the AJAX post so that the best match's name and photo are displayed.
    $('#match-name').text(data.name);
    $('#match-img').attr('src', data.photo);

    // Show the modal with the best match
    $('#results-modal').modal('toggle');
  }

  const submit = function(e) {
    e.preventDefault();

    // If all required fields are filled
    if (validateForm()) {

      // Create an object for the user's data
      const userData = {
        name: $('#name').val().trim(),
        photo: $('#photo').val().trim(),
        scores: [
          $('#q1').val(),
          $('#q2').val(),
          $('#q3').val(),
          $('#q4').val(),
          $('#q5').val(),
          $('#q6').val(),
          $('#q7').val(),
          $('#q8').val(),
          $('#q9').val(),
          $('#q10').val()
        ]
      };

      // AJAX post the data to the employees API.
      $.post('/api/employees', userData, displayModal);

    } else {

      // Display an error alert if the form is not valid
      $('#error')
        .text('Please fill out all fields before submitting!')
        .addClass('alert alert-danger');
    }
  }

  $('#submit').on('click', submit)

})