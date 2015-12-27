
$('.get-item').click(function(e) {
  e.preventDefault();
  alert('this will select the item');
});

$('.easter-egg').click(function(e) {
  if ($('.easter-egg-img').hasClass('hidden'))
    $('.easter-egg-img').removeClass('hidden')
  else $('.easter-egg-img').addClass('hidden');
});

