$(document).ready(function () {
  $(".page").load("kezdolap.html");
  $("#kezdolap").click(function () {
    $(".page").load("kezdolap.html");
    changeActiveTab("kezdolap");
  });

  $("#bongeszes").click(function () {
    $(".page").load("bongeszes.html", filterButton);

    changeActiveTab("bongeszes");

    fillFromDatabase();
  });

  $("#keszitok").click(function () {
    $(".page").load("keszitok.html");
    changeActiveTab("keszitok");
  });
});

function changeActiveTab(tab) {
  let navs = document.querySelectorAll(".nav-link");
  navs.forEach((x) => {
    if (x.id == tab) {
      x.classList.add("active");
    } else {
      x.classList.remove("active");
    }
  });
}

function fillFromDatabase() {
  let onceRun = false;
  axios
    .get("http://localhost:5000/api")
    .then(function (response) {
      response.data.forEach((element) => {
        let div = document.createElement("div");
        div.classList.add("card", "col-md-6");
        div.innerHTML =
          '<div class="card-body"> <h5 class="card-title">ID: </h5> <p class="card-subtitle text-muted">' +
          element._id +
          '</p><br /><p class="card-text">' +
          "Típus: " +
          element.tipus +
          "<br />" +
          "Cím: " +
          element.cim +
          "<br />" +
          "Hossz: " +
          element.hossz +
          "<br />" +
          "Kiadás: " +
          element.kiadas +
          "</p></div>";
        document.querySelector(".content").appendChild(div);
        if (!onceRun) {
          onceRun = true;
          selectFill(element);
        }
      });
    })
    .catch(function () {
      console.log("baj van tesó");
    });
}

function selectFill(ele) {
  var separators = [":", ",", "{", "}"];
  for (
    let index = 1;
    index <
    JSON.stringify(ele).split(new RegExp(separators.join("|"), "g")).length - 1;
    index += 2
  ) {
    let option = document.createElement("option");
    option.text = JSON.stringify(ele)
      .split(new RegExp(separators.join("|"), "g"))
      [index].replace('"', "")
      .replace('"', "");
    document.querySelector("#selectMain").appendChild(option);
  }
}

function filterButton() {
  $("#btnMain").click(function () {
    let selected = document.querySelector("#selectMain").value;
    let userInput = document.querySelector("#textMain").value;
    document.querySelector("#textMain").value = "";
    document.querySelector(".content").innerHTML = "";
    if (userInput != "") {
      axios
        .get(`http://localhost:5000/api/?${selected}=${userInput}`)
        .then(function (response) {
          response.data.forEach((element) => {
            let div = document.createElement("div");
            div.classList.add("card", "col-md-6");
            div.innerHTML =
              '<div class="card-body"> <h5 class="card-title">ID: </h5> <p class="card-subtitle text-muted">' +
              element._id +
              '</p><br /><p class="card-text">' +
              "Típus: " +
              element.tipus +
              "<br />" +
              "Cím: " +
              element.cim +
              "<br />" +
              "Hossz: " +
              element.hossz +
              "<br />" +
              "Kiadás: " +
              element.kiadas +
              "</p></div>";
            document.querySelector(".content").appendChild(div);
          });
        })
        .catch(function () {
          console.log("baj van tesó");
        });
    } else {
      fillFromDatabase();
    }
  });
  addNewButton();
}

function addNewButton() {
  $("#btnNew").click(function () {
    axios
      .post("http://localhost:5000/api", {
        tipus: document.querySelector("#newTipus").value.toString(),
        cim: document.querySelector("#newCim").value.toString(),
        hossz: document.querySelector("#newHossz").value.toString(),
        kiadas: document.querySelector("#newKiadas").value.toString(),
      })
      .then(function () {
        console.log("kész");
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
