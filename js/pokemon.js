
window.onload = init;

let colorTypes = new Map();
colorTypes['normal'] = "#A8A090"
colorTypes['fighting'] = "#A05038"
colorTypes['flying'] = "#98A8F0"
colorTypes['poison'] = "#B058A0"
colorTypes['ground'] = "#E9D6A4"
colorTypes['rock'] = "#B8A058"
colorTypes['bug'] = "#A8B820"
colorTypes['ghost'] = "#6060B0"
colorTypes['steel'] = "#A8A8C0"
colorTypes['fire'] = "#F05030"
colorTypes['water'] = "#3899F8"
colorTypes['grass'] = "#78C850"
colorTypes['electric'] = "#F8D030"
colorTypes['psychic'] = "#F870A0"
colorTypes['ice'] = "#58C8E0"
colorTypes['dragon'] = "#7860E0"
colorTypes['dark'] = "#7A5848"
colorTypes['fairy'] = "#E79FE7"


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
            var body = document.getElementsByClassName("body")[0]
            var name = document.createElement("h1")
            var splashart = document.getElementById("pokemonSplashArt")
            var ability = document.getElementById("pokemonAbility")
            var move = document.getElementById("pokemonMove")
            var types = document.getElementById("types")
            var info = document.getElementById("pokemonInfo")
            
            name.setAttribute("class", "name")
            name.setAttribute("id", "pokemonName")
            name.innerHTML = resultado["name"]+' #'+resultado["id"]
            body.insertBefore(name, types)
            
            img = resultado["sprites"]["other"]["official-artwork"]["front_default"]
            if (img){
                splashart.setAttribute("src",  img)
                splashart.setAttribute("alt", resultado["name"]+" image")
            }
            

            for (let i in resultado['types']){
                var type = resultado['types'][i]['type']['name']
                element = document.createElement('div')
                element.style.backgroundColor = colorTypes[type]
                element.appendChild(document.createTextNode(type))
                types.appendChild(element)
            }
            
            height = createWeightHeight("Height", resultado['height']/10 + "m")
            weight = createWeightHeight("Weight", resultado['weight']/10 + "Kgs")

            info.appendChild(height)
            info.appendChild(weight)
            
            var li = document.createElement('li')
            var propertySpan = document.createElement("span")
            propertySpan.setAttribute("class", "property")
            propertySpan.appendChild(document.createTextNode("Abilities"))
            li.appendChild(propertySpan)

            for (let i in resultado['abilities']){
                var ability = resultado['abilities'][i]['ability']['name']
                var valueSpan = document.createElement("span")
                valueSpan.setAttribute("class", "value")
                valueSpan.appendChild(document.createTextNode(ability))
                li.appendChild(valueSpan)
            }
            info.appendChild(li)
            
            for (let i in resultado['moves']){
                var aux = resultado['moves'][i]['move']['name']
                element = createElement(aux)
                move.appendChild(element)
            }

            for (let i in resultado['stats']){
                statName = resultado['stats'][i]['stat']['name']
                baseStat = resultado['stats'][i]['base_stat']
                var stat = document.getElementById(statName)
                
                stat.style.width = (baseStat/2.55)+'%'
                stat.innerHTML = baseStat
            }
            loader.style.display = "none";
            
        }else if(this.readyState == 1 || this.readyState == 2 || this.readyState == 3){
            loader.style.display = "block";
        }else if(this.readyState == 4 && this.status == 404){
            loader.style.display = "none";
            window.alert("The selected pokemon doesn't exist")
            history.go(-1);

        }else if(this.readyState == 4 && this.status != 200){
            if(window.confirm("An error has ocurred. Retry?")){
                this.open("GET", urlNext)
                this.send()
            }else{
                history.go(-1);
            }

        }
    }

    function createWeightHeight(property, value){
        var li = document.createElement('li')
        var propertySpan = document.createElement("span")
        var valueSpan = document.createElement("span")
        propertySpan.setAttribute("class", "property")
        valueSpan.setAttribute("class", "value")
        propertySpan.appendChild(document.createTextNode(property))
        valueSpan.appendChild(document.createTextNode(value))
        li.appendChild(propertySpan)
        li.appendChild(valueSpan)

        return li
    }

    function createElement(element){

        p = document.createElement("p")

        p.appendChild(document.createTextNode(element))
        //p.setAttribute("align","left")
        return p
    }

    http.send()
}

