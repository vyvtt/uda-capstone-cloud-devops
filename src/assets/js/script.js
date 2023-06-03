//More about wiki API here: https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_

const searchBar = document.getElementById("url");
let title;

document.querySelector(".search").addEventListener("submit", function (event) {
  clearContent();
  event.preventDefault();

  fetch("https://en.wikipedia.org/api/rest_v1/page/random/title")
    .then(function (response) {
      if (response.status === 404) {
        alertmessage("Error");
        throw new Error();
      }

      return response.json();
    })
    .then(function (json) {
      title = json.items[0].title;

      fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + title)
        .then(function (response) {
          if (response.status === 404) {
            alertmessage("Error");
            throw new Error();
          }

          return response.json();
        })
        .then(function (json) {
          try {
            document.querySelector(
              "#wiki-image"
            ).innerHTML = `<img src="${json.originalimage.source}" alt="Photo" />`;
          } catch (error) {
            document.querySelector(
              "#wiki-image"
            ).src = `images/no-thumbnail.jpg`;
          }

          let lines = document.getElementsByClassName("line");
          for (let i = 0; i < lines.length; i++) {
            lines[i].style.display = "inline-block";
          }
          document.querySelector(
            "#wiki-title"
          ).innerHTML = `<strong>${json.title}</strong>`;
          document.querySelector(
            "#wiki-description"
          ).innerHTML = `${json.description}`;
          document.querySelector(
            "#wiki-content"
          ).innerHTML = `${json.extract_html}`;
          document.querySelector(
            "#wiki-link"
          ).innerHTML = `View in <a href="${json.content_urls.desktop.page}" target="_blank"><strong>Wikipedia</strong></a>`;
          document.querySelector("#btn-submit").disabled = false;

          document.querySelector("#wiki-main").style.display = "flex";
          document.querySelector("#wiki-load").style.display = "none";
        })
        .catch((err) => {
          console.log(err);
          alertmessage('Oops! "' + inputurl + '" does not exist');
        });

      // Related ------------------------------------
      fetch("https://en.wikipedia.org/api/rest_v1/page/related/" + title)
        .then(function (response) {
          if (response.status === 404) {
            alertmessage("Error");
            throw new Error();
          }
          return response.json();
        })
        .then(function (json) {
          document.getElementById("wiki-related-h2").innerHTML =
            "Related articles</br>";
          json.pages.forEach(relatedPage);
        })
        .catch((err) => {
          console.log(err);
          alertmessage('Oops! "' + inputurl + '" does not exist');
        });
    })
    .catch((err) => {
      console.log(err);
      alertmessage('Oops! "' + inputurl + '" does not exist');
    });
});

// Alert
function alertmessage(message) {
  var showalert = document.getElementById("showalert");
  const collection = document.getElementsByClassName("alertmessage");
  collection[0].innerHTML = message;
  showalert.classList.remove("hide");
  showalert.classList.add("showalert");
  console.log(message);

  return 0;
}

// to clear all content
function clearContent() {
  let lines = document.getElementsByClassName("line");
  for (let i = 0; i < lines.length; i++) {
    lines[i].style.display = "none";
  }

  // Clear content
  document.querySelector(
    "#wiki-image"
  ).innerHTML = `<div class="wrapper"><div class="cssload-loader"></div></div>`;
  document.getElementById("wiki-related").innerHTML = "";
  document.getElementById("wiki-related-h2").innerHTML = "";
  document.querySelector("#btn-submit").disabled = true;
  document.querySelector("#wiki-title").innerHTML = ``;
  document.querySelector("#wiki-description").innerHTML = ``;
  document.querySelector("#wiki-content").innerHTML = ``;
  document.querySelector("#wiki-link").innerHTML = ``;

  document.querySelector("#wiki-main").style.display = "none";
  document.querySelector("#wiki-load").style.display = "flex";
}

// to close the alert badge starts
function closethealert() {
  var showalert = document.getElementById("showalert");

  showalert.classList.remove("showalert");
  showalert.classList.add("hideit");
}

// to loop related item
function relatedPage(value, index, array) {
  if (index > 19 || value.description == undefined) {
    return;
  }
  document.getElementById(
    "wiki-related"
  ).innerHTML += `- <a href="${value.content_urls.desktop.page}" target="_blank"><strong>${value.titles.normalized}</strong></a>: ${value.description}</br>`;
}
//https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_
