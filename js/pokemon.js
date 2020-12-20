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
        var typeList = document.getElementById("pokemonTypeList")
        var height = document.getElementById("pokemonHeight")
        var weight = document.getElementById("pokemonWeight")
        var ability = document.getElementById("pokemonAbility")
        var move = document.getElementById("pokemonMove")   
        
        
        name.innerHTML = '<div class="name">'+resultado["name"]+"</div>"
        splashart.innerHTML = "<img src=" + resultado["sprites"]["other"]["official-artwork"]["front_default"]+">"
        
        for (let i in resultado['types']){
			var aux = resultado['types'][i]['type']['name']
			element = createElement(aux)
			typeList.appendChild(element)
		}
		
		element = createElement(resultado['height']/10 + "m")
		height.appendChild(element)
		
		element = createElement(resultado['weight']/10 + "Kgs")
		weight.appendChild(element)
		
		for (let i in resultado['abilities']){
			var aux = resultado['abilities'][i]['ability']['name']
			element = createElement(aux)
			ability.appendChild(element)
		}
		
		for (let i in resultado['moves']){
			var aux = resultado['moves'][i]['move']['name']
			element = createElement(aux)
			move.appendChild(element)
		}
		 
    }
}

function createElement(element){

    p = document.createElement("p")

    p.appendChild(document.createTextNode(element))
    p.setAttribute("align","left")
    return p
}

http.send()

