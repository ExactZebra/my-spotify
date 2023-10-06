const url = window.location.search
const params = new URLSearchParams(url)
const id = params.get('id')
const track = document.getElementById('track')
const fragment = document.createDocumentFragment()


document.addEventListener('DOMContentLoaded', () =>{
    fetchPlaylist2()
})

const fetchPlaylist2 = async() => {
    const url = `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=100`;
const options = {
	method: 'GET',
	headers: {
        'X-RapidAPI-Key': '3a78b018a3mshf72d1b6c250e7bbp18847cjsndfe4b2061a97',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    console.log(result)
    
    mostPlaylist(result.items)

} catch (error) {
	console.error(error);
}
}

const mostPlaylist = (info)=>{
    console.log('INFO ANTES DEL CICLO=>', info)
    info.forEach((item,index)=>{
        track.querySelector('.Indice').textContent = index + 1
        track.querySelector('.Nombre').textContent=item.track.name
        track.querySelector('.Duracion').textContent = convertirMilisegundosAMinutos(item.track.duration_ms)

        item.track.artists.forEach((nomb)=>{
            track.querySelector('.Artist').textContent=nomb.name
            console.log('ARTISTAS DESPUES DEL CICLO ',nomb.name)
        })

        const clone = track.cloneNode(true)
        fragment.appendChild(clone)
    })
    track.appendChild(fragment)
    
}

function convertirMilisegundosAMinutos(milisegundos) {

    const segundos = Math.floor((milisegundos / 1000) % 60);
    const minutos = Math.floor((milisegundos / (1000 * 60)) % 60);
  
  
    const duracionFormateada = `${agregarCeros(minutos)}:${agregarCeros(segundos)}`;
  
    return duracionFormateada;
  }
  function agregarCeros(valor) {
  
    return valor < 10 ? `0${valor}` : valor.toString();
  }
  const milisegundos = 1234567;
  const duracionEnMinutos = convertirMilisegundosAMinutos(milisegundos);
