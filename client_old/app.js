function VoteButtons(id) {
  console.log("Start");
  let currentVotes;
  axios
    .get(`http://localhost:5000/api/?_id=${id}`)
    .then(function (response) {
      currentVotes = parseInt(response.data[0].votes);
      addVote(currentVotes + 1, id);
    })
    .catch(function () {
      console.log("baj van tesó");
    });
}

function addVote(currentVotes, id) {
  console.log("id",id);
  console.log("vote",currentVotes);
  axios
    .patch(`http://localhost:5000/api/${id}`, {
      votes: currentVotes,
    })
    .then(function () {
      console.log("kész");
      location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function DeleteButtons(id) {
  axios
    .delete(`http://localhost:5000/api/?_id=${id}`)
    .then(function () {
      console.log("kész");
      location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function fillFromDatabase() {
  let onceRun = false;
  axios
    .get("http://localhost:5000/api?_votes=descending")
    .then(function (response) {
      response.data.forEach((element) => {
        let div = document.createElement("div");
        div.classList.add("card", "col-lg-6");
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
          "<br />" +
          "Szavazatok: " +
          element.votes +
          `</p><button type="button" onclick="VoteButtons(this.id)" class="btn vote btn-success" style="width:100px" id="${element._id}">Szavazás</button>` +
          `<button type="button" onclick="DeleteButtons(this.id)" class="btn vote btn-outline-danger mx-2" style="width:100px" id="${element._id}">Törlés</button></div>`;
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
        .get(
          `http://localhost:5000/api/?${selected}=${userInput}&_votes=descending`
        )
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
              "<br />" +
              "Szavazatok: " +
              element.votes +
              `</p><button type="button" class="btn btn-primary vote" id="${element._id}">Szavazás</button></div>` +
              `<button type="button" onclick="DeleteButtons(this.id)" class="btn vote btn-outline-danger mx-2" style="width:100px" id="${element._id}">Törlés</button></div>`;
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
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
