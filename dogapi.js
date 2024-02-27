const btnFetch = document.getElementById('btn-fetch');
const btnXHR = document.getElementById('btn-xhr');
const imagen = document.getElementById('imagen');

btnFetch.addEventListener('click', () => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
      imagen.innerHTML = `<img src="${data.message}" alt="Imagen de perro aleatoria">`;
    })
    .catch(error => console.error('Error al obtener la imagen:', error));
});

btnXHR.addEventListener('click', () => {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://dog.ceo/api/breeds/image/random');

  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      imagen.innerHTML = `<img src="${response.message}" alt="Imagen de perro aleatoria">`;
    } else {
      console.error('Error al obtener la imagen:', xhr.statusText);
    }
  };

  xhr.send();
});
