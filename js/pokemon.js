
window.onload = init;

function init(){

    let params = new URLSearchParams(location.search)
    var id = params.get('id').toLowerCase()

    const url = "https://pokeapi.co/api/v2/pokemon/"+id
    const http = new XMLHttpRequest()

    var loader = document.getElementById("pokemonLoader")

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
            
            var img = document.createElement("img")
            
            name.innerHTML = '<div class="name">'+resultado["name"]+"</div>"
            img.setAttribute("src",  resultado["sprites"]["other"]["official-artwork"]["front_default"])
            img.setAttribute("onerror", "this.src='img/unknown.jpg'")
            splashart.appendChild(img)
            
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
            loader.style.display = "none";
            
        }else if(this.readyState == 1 || this.readyState == 2 || this.readyState == 3){
            loader.style.display = "block";
        }else if(this.readyState == 4 && this.status != 200){
            if(window.confirm("An error has ocurred. Retry?")){
                this.open("GET", urlNext)
                this.send()
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
}

