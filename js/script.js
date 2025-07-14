  const button = document.getElementById('showTextButton');
  const text = document.getElementById('textElement');

  button.addEventListener('click', function() {
    button.style.display = 'none';    // Ukrywa przycisk
    text.style.display = 'block';     // Pokazuje tekst
  });


let like = document.querySelector('#like');
let avg = document.getElementById('#avg');
like.addEventListener('click', function() {
    console.log(avg+1);
});
like.addEventListener('click', function() {
  let currentValue = parseInt(avg.textContent, 10) || 0;
  avg.textContent = currentValue + 1;
});
console.log(like);
console.log(avg);