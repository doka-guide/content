$(document).ready(function(){

  $('#max').on('input', function() {
    $('#meter').prop('max', $('#max').val())
  });

  $('#min').on('input', function() {
    $('#meter').prop('min', $('#min').val())
  });

  $('#value').on('input', function() {
    $('#meter').prop('value', $('#value').val())
  });

  $('#high').on('input', function() {
    $('#meter').prop('high', $('#high').val())
  });

  $('#low').on('input', function() {
    $('#meter').prop('low', $('#low').val())
  });

  $('#optimum').on('input', function() {
    $('#meter').prop('optimum', $('#optimum').val())
  });

});
