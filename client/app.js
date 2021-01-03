$(document).ready(function () {
    let onceRun = false;
    axios.get('http://localhost:5000/api')
        .then(function (response) {
            console.log(response.data);
            response.data.forEach(element => {
                let li = document.createElement("li");
                li.innerHTML = "Id: " + element._id + "<br />" + "Típus: " + element.tipus + "<br />" + "Cím: " + element.cim + "<br />" + "Hossz: " + element.hossz + "<br />" + "Kiadás: " + element.kiadas + "<hr>";
                document.querySelector(".content").appendChild(li);
                if (!onceRun) {
                    onceRun = true;
                    selectFill(element);
                }
            });
        })
        .catch(function () {
            console.log("baj van tesó");
        })
    function selectFill(ele) {
        var separators = [':', ',', "{", "}"];
        for (let index = 1; index < JSON.stringify(ele).split(new RegExp(separators.join('|'), 'g')).length - 1; index += 2) {
            let option = document.createElement("option");
            option.text = JSON.stringify(ele).split(new RegExp(separators.join('|'), 'g'))[index].replace('"', "").replace('"', "");
            document.querySelector("#selectMain").appendChild(option);
        }
    }
    $("#btnMain").click(function () {
        let selected = document.querySelector("#selectMain").value;
        let userInput = document.querySelector("#textMain").value;
        document.querySelector(".content").innerHTML = "";
        axios.get(`http://localhost:5000/api/?${selected}=${userInput}`)
            .then(function (response) {
                response.data.forEach(element => {
                    let li = document.createElement("li");
                    li.innerHTML = "Id: " + element._id + "<br />" + "Típus: " + element.tipus + "<br />" + "Cím: " + element.cim + "<br />" + "Hossz: " + element.hossz + "<br />" + "Kiadás: " + element.kiadas + "<hr>";
                    document.querySelector(".content").appendChild(li);
                });
            })
            .catch(function () {
                console.log("baj van tesó");
            })
    })
    $("#btnNew").click(function () {
        axios.post("http://localhost:5000/api", {
            "tipus": document.querySelector("#newTipus").value.toString(),
            "cim": document.querySelector("#newCim").value.toString(),
            "hossz": document.querySelector("#newHossz").value.toString(),
            "kiadas": document.querySelector("#newKiadas").value.toString()
        })
            .then(function () {
                console.log("kész");
            })
            .catch(function (error) {
                console.log(error);
            })
    })
})