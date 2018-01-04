let btn = document.getElementById("btn");
let data = document.getElementById("data");
let counter = 1;

btn.addEventListener("click", function(){
  let ourRequest = new XMLHttpRequest();

  ourRequest.open("GET","https://learnwebcode.github.io/json-example/animals-"+counter+".json");
  ourRequest.onload = () => {
    if(ourRequest.status >= 200 && ourRequest.status < 400) {
      let ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    }
    else {
      console.log("API error");
    }
  };
  counter++;
  if (counter==4) btn.style.visibility='hidden';

  ourRequest.onerror = () => {
    console.log("Connection error!");
  }
  ourRequest.send();
});

renderHTML = (data1) => {
  let htmlString = "";
  for(let i=0; i<data1.length; i++) {
    htmlString += "<p>" + data1[i].name + " is a " + data1[i].species + " who likes to eat: ";
    for(let j=0; j<data1[i].foods.likes.length; j++) {
      htmlString += data1[i].foods.likes[j] + " ";
    }
    htmlString += "and dislikes: ";
    for(let ii=0; ii<data1[i].foods.dislikes.length; ii++) {
      htmlString += data1[i].foods.dislikes[ii] + " ";
    }
    htmlString += "</p>";
  }
  data.insertAdjacentHTML("beforeend", htmlString);
};
