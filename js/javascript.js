const url = "https://pokeapi.co/api/v2/type"
const urlAll = "https://pokeapi.co/api/v2/pokemon"
const http = new XMLHttpRequest()

http.open("GET", url)

http.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){
        var resultado = JSON.parse(this.responseText)
        typeSelector(resultado["results"])
    }
}

http.send()

window.onload = searchAll;

function searchAll(){
    var typeList = document.getElementById("typeList")
    typeList.innerHTML = ''
    searchNext("https://pokeapi.co/api/v2/pokemon?offset=0&limit=21")
}

function searchNext(urlNext){
    var typeList = document.getElementById("typeList")
    var prevButton = document.getElementById("seeMoreButton")
    if (prevButton){
        typeList.removeChild(prevButton)
    }
    const client = new XMLHttpRequest()

    client.open("GET", urlNext)

    client.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            var resultado = JSON.parse(this.responseText)
            for (let i in resultado['results']){
                var name = resultado['results'][i]["name"]
                var num = resultado['results'][i]["url"].split("/")[6]

                element = createElement(name, num)

                typeList.appendChild(element)
            }
            var button = document.createElement("button")
            var urlNext = resultado["next"]
            button.setAttribute("onclick", "searchNext('"+urlNext+"')")
            button.appendChild(document.createTextNode("See More"))
            button.setAttribute("id", "seeMoreButton")
            typeList.appendChild(button)
        }
    }
    
     client.send()
}

function typeSelector(types){
    var typeSelect = document.getElementById("typeSelect")

    for (let type in types){
        var option = document.createElement("option")
        value = types[type]["url"].split("/")[6]
        
        option.setAttribute("value", value)
        option.setAttribute("label", types[type]["name"])

        typeSelect.appendChild(option)
    }
}

function searchType(type){
    if (type == '0'){
        searchAll()
        return
    }
    var typeList = document.getElementById("typeList")
    const client = new XMLHttpRequest()

    client.open("GET", url+'/'+type)

    client.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            typeList.innerHTML = ''
            var resultado = JSON.parse(this.responseText)["pokemon"]
            for (let i in resultado){
                var name = resultado[i]["pokemon"]["name"]
                var num = resultado[i]["pokemon"]["url"].split("/")[6]

                element = createElement(name, num)

                typeList.appendChild(element)
            }
        }
    }
    
     client.send()

}

function createElement(name, num){
    urlImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+num+".png"

    li = document.createElement("li")
    div = document.createElement("div")
    img = document.createElement("img")
    h4 = document.createElement("h4")

    img.setAttribute("src", urlImg)
    img.setAttribute("onerror", "this.src='img/unknown.jpg'")
    h4.appendChild(document.createTextNode(name))
    div.appendChild(img)
    div.appendChild(h4)
    div.setAttribute("class", "pokemonListItem")
    li.appendChild(div)
    li.setAttribute("onclick", "searchPokemon("+num+")")

    return li
}

function searchPokemonPressKey(key,id){
    if (key.keyCode == 13){
        searchPokemon(id)
    }
}

function searchPokemon(id){
    page = window.location.pathname.replace("index.html", "pokemon.html?id="+id)
    window.location.href = page
}
	
	

