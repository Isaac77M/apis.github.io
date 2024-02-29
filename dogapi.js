const btnFetch = document.getElementById('btn-fetch');
const btnXML = document.getElementById('btn-httprequest');
const imagen = document.getElementById('imagen');
const btnJqueryNormal = document.getElementById('btn-jquery-normal');
const btnJqueryRandom = document.getElementById('btn-jquery-random');

btnFetch.addEventListener('click', () => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
      imagen.innerHTML = `<img src="${data.message}" alt="Imagen de perro aleatoria">`;
    })
    .catch(error => console.error('Error al obtener la imagen:', error));
});

btnXML.addEventListener('click', () => {
  const xml = new XMLHttpRequest();

  xml.open('GET', 'https://dog.ceo/api/breeds/image/random');

  xml.onload = function() {
    if (xml.status === 200) {
      const response = JSON.parse(xml.responseText);
      imagen.innerHTML = `<img src="${response.message}" alt="Imagen de perro aleatoria">`;
    } else {
      console.error('Error al obtener la imagen:', xml.statusText);
    }
  };

  xml.send();
});

btnJqueryNormal.addEventListener('click', () => {
  $.ajax({
    url: 'https://dog.ceo/api/breeds/image/random',
    success: function(response) {
      imagen.innerHTML = `<img src="${response.message}" alt="Imagen de perro aleatoria">`;
    },
    error: function(error) {
      console.error('Error al obtener la imagen:', error);
    }
  });
});

btnJqueryRandom.addEventListener('click', () => {
  const imagenes = [];
  const promesas = [];

  const cantidadImagenes = 4;

  for (let i = 0; i < cantidadImagenes; i++) {
    promesas.push(
      $.ajax({
        url: 'https://dog.ceo/api/breeds/image/random',
        success: function(response) {
          imagenes.push(`<img src="${response.message}" alt="Imagen de perro aleatoria">`);
        },
        error: function(error) {
          console.error('Error al obtener la imagen:', error);
        }
      })
    );
  }

  Promise.all(promesas).then(() => {
    imagen.innerHTML = imagenes.join('');
  });
});
