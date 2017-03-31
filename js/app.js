(function () {
  'use strict';
})();

$(document).ready( () => {

  const $deathStar = $('.deathStarWrapper');
  const $personCont = $('.personContainer');
  const $title = $('.center');
  const $audioEffect = $('.audio audio');
  const $weapon = $('.weapon');


  $title.on('click', () => {
    searchQuery();
  });


  $deathStar.on('click', () => {
    // Prevent sound/changing color if zero children are present
    if (!$personCont.children().length) {
      return;
    }

    playEffect('http://soundbible.com/grab.php?id=1771&type=mp3');
    $weapon.addClass('change');
    setTimeout(() => {
      $('.clear').fadeOut(2500, function () {
        $('.clear').remove();
      });
    }, 1500);

    setTimeout(() => {
      $weapon.removeClass('change');
    }, 1500);
  });


  function searchQuery(index) {
    const url = 'http://swapi.co/api/people/' + randomNumber(1, 87) + '/';
         
    $.ajax( {
      url: url, 
      type: 'GET',  
      dataType: 'json'
    }).done((person) => {
        const name = person.name;
        const birthYear = person.birth_year === 'unknown' ? 'Unknown' : person.birth_year;

        $personCont.prepend(
          `<p class='clear'>Name: ${name}</p>
           <p class='clear'>Birth: ${birthYear}</p>`
        ).hide().fadeIn(800);
      }).fail(() => {
        $personCont.prepend(
          `<p class='notFound clear'>Unable to Load/Find</p>`
        ).hide().fadeIn(800);
      });
  }


  function randomNumber(min, max) {
    let random = Math.floor(Math.random() * (max - min + 1) + min);
    // people/17/ does not work
      // Use while loop to cycle until number other than 17
    while (random === 17) {
      console.log(random);
      random = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return random;
  }


  function playEffect(soundEffect) {
    $audioEffect.attr('src', soundEffect);
    $audioEffect.prop('volume', 0.2);
    $audioEffect[0].play();
  }
  
}); // .ready()
