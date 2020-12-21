window.onload = init;

function init(){
    getTypes();
    searchAll();
}

function getTypes(){
    const url = "https://pokeapi.co/api/v2/type"
    const http = new XMLHttpRequest()

    http.open("GET", url)

    http.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            var typeSelect = document.getElementById("typeSelect")
            var types = JSON.parse(this.responseText)["results"]

            for (let type in types){
                var option = document.createElement("option")
                value = types[type]["url"].split("/")[6]
                
                option.setAttribute("value", value)
                option.setAttribute("label", types[type]["name"])

                typeSelect.appendChild(option)
            }
        }else if(this.readyState == 4 && this.status != 200){
            if(window.confirm("An error has ocurred. Retry?")){
                this.open("GET", url)
                this.send()
            }

        }
    }

    http.send()
}

function searchAll(){
    var typeList = document.getElementById("typeList")
    typeList.innerHTML = ''
    searchNext("https://pokeapi.co/api/v2/pokemon?offset=0&limit=21")
}

function searchNext(urlNext){
    var body = document.getElementsByClassName("body")[0]
    var typeList = document.getElementById("typeList")
    var loader = document.getElementById("listLoader")
    var prevButton = document.getElementById("seeMoreButton")
    if (prevButton){
        body.removeChild(prevButton)
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
            loader.style.display = "none"
            body.appendChild(button)
        }else if(this.readyState == 1 || this.readyState == 2 || this.readyState == 3){
            loader.style.display = "block";
        }else if(this.readyState == 4 && this.status != 200){
            if(window.confirm("An error has ocurred. Retry?")){
                this.open("GET", urlNext)
                this.send()
            }

        }
    }
    
     client.send()
}

function searchType(type){
    if (type == '0'){
        searchAll()
        return
    }
    
    var typeList = document.getElementById("typeList")
    var loader = document.getElementById("listLoader")
    const client = new XMLHttpRequest()
    const url = "https://pokeapi.co/api/v2/type/"+type

    loader.style.display = "block";

    client.open("GET", url)

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
            loader.style.display = "none";
        }else if(this.readyState == 1 || this.readyState == 2 || this.readyState == 3){
            loader.style.display = "block";
        }else if(this.readyState == 4 && this.status != 200){
            if(window.confirm("An error has ocurred. Retry?")){
                this.open("GET", url)
                this.send()
            }

        }
    }
    
     client.send()

}

function createElement(name, num){
    urlImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+num+".png"

    li = document.createElement("li")
    div = document.createElement("div")
    img = document.createElement("img")
    h4 = document.createElement("h4")

    img.setAttribute("src", urlImg)
    img.setAttribute("alt", name+" image")
    img.setAttribute("onerror", "this.src='img/unknown.jpg'; this.alt='Pokemon image not available'")
    h4.appendChild(document.createTextNode(name))
    div.appendChild(img)
    div.appendChild(h4)
    div.setAttribute("class", "pokemonListItem")
    li.appendChild(div)
    li.setAttribute("onclick", "searchPokemon("+num+")")

    return li
}

function searchBarPokemon(){
    searchBar = document.getElementById("searchBar")
    id = searchBar.children[1].value;
    searchPokemon(id)
}

function searchPokemon(id){
    arr = window.location.href.split('/')
    last = arr[arr.length-1]
    page = window.location.href.replace(last, "pokemon.html?id="+id)
    window.location.href = page
}
	
	

