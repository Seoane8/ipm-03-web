let params = new URLSearchParams(location.search)
var id = params.get('id')

const url = "https://pokeapi.co/api/v2/pokemon/"+id

const http = new XMLHttpRequest()

http.open("GET", url)

http.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){
        var resultado = JSON.parse(this.responseText)
        var name = document.getElementById("pokemonName")
        name.innerHTML = resultado["name"]
    }
}

http.send()