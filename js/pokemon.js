let params = new URLSearchParams(location.search)
var id = params.get('id').toLowerCase()

const url = "https://pokeapi.co/api/v2/pokemon/"+id

const http = new XMLHttpRequest()

http.open("GET", url)

http.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){
        var resultado = JSON.parse(this.responseText)
        var name = document.getElementById("pokemonName")
        var splashart = document.getElementById("pokemonSplashArt")
        name.innerHTML = '<div class="name">'+resultado["name"]+"</div>"
        splashart.innerHTML = "<img src=" + resultado["sprites"]["other"]["official-artwork"]["front_default"]+">"
    }
}

http.send()

