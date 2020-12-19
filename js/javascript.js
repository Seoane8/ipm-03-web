const url = "https://pokeapi.co/api/v2/type"
const http = new XMLHttpRequest()

http.open("GET", url)

http.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){
        var resultado = JSON.parse(this.responseText)
        typeSelector(resultado["results"])
    }
}

http.send()

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
    var typeList = document.getElementById("typeList")
    const client = new XMLHttpRequest()

    client.open("GET", url+'/'+type)

    client.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            var resultado = JSON.parse(this.responseText)["pokemon"]
            for (let i in resultado){
                var element = document.createElement("li")
                var name = resultado[i]["pokemon"]["name"]
                var num = resultado[i]["pokemon"]["url"].split("/")[6]

                element.setAttribute("value", num)
                element.appendChild(document.createTextNode(name))

                typeList.appendChild(element)
            }
        }
    }
    
     client.send()

}
