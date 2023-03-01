let baseurl="https://misty-fedora-clam.cyclic.app/"


let boxDropdown = document.querySelectorAll(".boxDropdown");
for (let x = 0; x < document.querySelectorAll("li.categ").length; x++) {
  let list = document.querySelectorAll("li.categ")[x];
  let boxDropdown_list = document.querySelectorAll(".boxDropdown")[x];
  list.addEventListener("mouseenter", () => {
    boxDropdown_list.style.display = "block";
    // swal("start","","warning")
  });
  list.addEventListener("mouseleave", () => {
    boxDropdown_list.style.display = "none";
  });
}
for (let x = 0; x < boxDropdown.length; x++) {
  const box = boxDropdown[x];
  box.addEventListener("mouseenter", () => {
    box.style.display = "block";
  });
  box.addEventListener("mouseleave", () => {
    box.style.display = "none";
  });
}
//for retractble div

const header = document.getElementsByClassName("header");
const toggle = document.getElementsByClassName("toggle");
const content = document.getElementsByClassName("content");
for (let i = 0; i < header.length; i++) {
  header[i].addEventListener("click", () => {
    content[i].classList.toggle("selected");
    toggle[i].textContent = content[i].classList.contains("selected")
      ? "-"
      : "+";
  });
}


// side navbar js
let sidenavbarbtn = document.getElementById("sliderbutton");
let fixednavbar = document.getElementById("fixedheadertop");
let maincont = document.getElementById("maincontainer");

sidenavbarbtn.addEventListener("click", () => {
  // fixednavbar.style.display="none"
  // console.log("hello nav")
  let sactivebtn = document.querySelector(".sliderbtn");
  if (sidenavbarbtn.classList.contains("active")) {
    fixednavbar.style.display = "block";
    maincont.style.top = "100px";
  } else {
    fixednavbar.style.display = "none";
    maincont.style.top = "40px";
  }
});

// products details from js
let data_to_show = JSON.parse(localStorage.getItem("Product_to_view"));
console.log(data_to_show);
let usercart_data = data_to_show;
let show_p_title = document.getElementById("show_p_title");
show_p_title.innerText = data_to_show.title;
let salep = document.getElementById("sp");
let mrp = document.querySelector(".mrp");
salep.innerText = `$ ${data_to_show.price[0]}`;
mrp.innerText = `$ ${data_to_show.price[1]}`;

let innerDiv4 = document.getElementById("ratingdiv2");
let rnum = document.getElementById("rnum");
let off = document.getElementById("off");
let cptag = document.getElementById("cptag");
let userreviews = document.getElementById("userreviews");
userreviews.innerText = data_to_show.userreviews;
rnum.innerText = data_to_show.rating;
off.innerText = data_to_show.offer;
cptag.innerText = data_to_show.color[0].c;
// innerDiv4.innerHTML=null;
for (let i = 0; i < data_to_show.rating; i++) {
  const star = document.createElement("i");
  star.classList.add("fa-solid", "fa-star");
  innerDiv4.append(star);
}

let diffrentcolors1 = document.getElementById("colors_div");
let productsizes = document.getElementById("productsizes");
let addtocartdiv = document.getElementById("addtocartdiv");
let detailcontent = document.getElementById("detailcontent");
let listpoints_onc = document.getElementById("listpoints_onc");
let fabriccontent = document.getElementById("fabriccontent");
let userreviews_ = document.getElementById("userreviews_");
let slideshow_container = document.getElementById("slideshow-container_");

for (let i = 0; i < data_to_show.color.length; i++) {
  let divv = document.createElement("div");
  divv.setAttribute("class", "diffrentcolors");
  divv.style.backgroundColor = data_to_show.color[i].c.toLowerCase();
  diffrentcolors1.append(divv);
}
for (let i = 0; i < data_to_show.size.length; i++) {
  let divv = document.createElement("div");
  let ptag = document.createElement("p");
  ptag.innerText = data_to_show.size[i];
  divv.append(ptag);
  let z=data_to_show.size[i];
  divv.addEventListener("click", () => {
    usercart_data.size = data_to_show.size[i];
    alert(`${z} size selected`)
  });
  productsizes.append(divv);
}

// add to cart button
addtocartdiv.addEventListener("click", () => {
  usercart_data.quantity=1;
  console.log(usercart_data)
  let a=usercart_data.size;
  console.log(a,typeof a)
if(typeof a =="string"){
  addproductTOcart()
}else{
  alert("Select Size First")
}



  function addproductTOcart() {
    fetch(`${baseurl}cart/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
          'Authorization':`${localStorage.getItem("token")}`
      },
      body: JSON.stringify(usercart_data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert(`${res.msg}`);
      })
      .catch((err) => console.log(err));
  }

});

for (let i = 0; i < data_to_show.details.length; i++) {
  let divv = document.createElement("div");
  let h2tag = document.createElement("h2");
  let ptag = document.createElement("p");
  h2tag.innerText = data_to_show.details[i++];
  ptag.innerText = data_to_show.details[i];
  divv.append(h2tag, ptag);
  detailcontent.append(divv);
}
for (let i = 0; i < data_to_show.listpoints.length; i++) {
  let listItem = document.createElement("li");
  let icon = document.createElement("i");

  icon.classList.add("fa", "fa-circle");
  listItem.appendChild(icon);
  // listItem.innerText=data_to_show.listpoints[i];
  listItem.appendChild(
    document.createTextNode(` ${data_to_show.listpoints[i]}`)
  );
  listpoints_onc.appendChild(listItem);
}

for (let i = 0; i < data_to_show.fabric.length; i++) {
  let ptag = document.createElement("p");
  ptag.innerText = data_to_show.fabric[i];
  fabriccontent.append(ptag);
}

for (let i = 0; i < data_to_show.reviews.length; i++) {
  const reviewDiv = document.createElement("div");
  const reviewHeading = document.createElement("h2");
  const reviewHeadingText = document.createTextNode(
    `${data_to_show.reviews[i].username} `
  );
  reviewHeading.appendChild(reviewHeadingText);
  const reviewDate = document.createElement("span");
  reviewDate.classList.add("dateinreview");
  const reviewDateText = document.createTextNode(` -${getdate()}`);
  reviewDate.appendChild(reviewDateText);
  reviewHeading.appendChild(reviewDate);
  const reviewContent = document.createElement("p");
  const reviewContentText = document.createTextNode(
    `${data_to_show.reviews[i].review}`
  );
  reviewContent.appendChild(reviewContentText);
  reviewDiv.appendChild(reviewHeading);
  reviewDiv.appendChild(reviewContent);
  userreviews_.appendChild(reviewDiv);
}

// js for slideshow
// createslideshow()
// function createslideshow() {
  for (let i = 0; i < data_to_show.img.length; i++) {
    const slideDiv = document.createElement("div");
    slideDiv.classList.add("mySlides", "fade");
    const slideImage = document.createElement("img");
    slideImage.setAttribute("src",data_to_show.img[i]);
    slideDiv.appendChild(slideImage);
    slideshow_container.appendChild(slideDiv);
  }
// }

function getdate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dayString = day.toString().padStart(2, "0");
  const monthString = month.toString().padStart(2, "0");
  const yearString = year.toString();
  const dateString = `${dayString}/${monthString}/${yearString}`;
  return dateString;
}

// createslideshow()
// slidshow for imgs

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// preview image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var previews = document.getElementsByClassName("preview");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < previews.length; i++) {
    previews[i].className = previews[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  previews[slideIndex - 1].className += " active";
}



// preview of slidshow
const parent_Element = document.getElementById('preview_container');
for (let i = 0; i < data_to_show.img.length; i++) {
  const previewDiv = document.createElement('div');
  previewDiv.classList.add('preview');
  const previewImage = document.createElement('img');
  previewImage.setAttribute('src', data_to_show.img[i]);
  previewDiv.setAttribute('onclick', `currentSlide(${i+1})`);
  previewDiv.appendChild(previewImage);
  parent_Element.appendChild(previewDiv);
}


// redirecting to otherpages
let men_p=document.getElementById("men_p");
men_p.addEventListener("click",()=>{
  localStorage.setItem("products_query","menjackets/")
})
let women_P=document.getElementById("women_P");
women_P.addEventListener("click",()=>{
  localStorage.setItem("products_query","womentshirt/")
})
let kid_P=document.getElementById("kid_P");
kid_P.addEventListener("click",()=>{
  localStorage.setItem("products_query","kidsjackets/")
})
let fot_w=document.getElementById("fot_w");
fot_w.addEventListener("click",()=>{
  localStorage.setItem("products_query","menshoose/")
})


const searchInput = document.getElementById("search");
const searchButton = document.querySelector(".fa-magnifying-glass");

searchButton.addEventListener("click",()=>{
  let userInput = searchInput.value.toLowerCase();
  let str1="mensproducts men menjackets menjackets";
  let str2="womensproducts women womentshirt tshirt";
  let str3="kidsjackets jacktets kids";
  let str4="menshoose shoose footwears footwear menproducts men"
  if(str1.includes(userInput)){
    localStorage.setItem("products_query","menjackets/")
    location.href="../Html/ProductPage.html"
    return;
  }else if(str2.includes(userInput)){
    localStorage.setItem("products_query","womentshirt/")
    location.href="../Html/ProductPage.html"
    return;
  } else if(str3.includes(userInput)){
    localStorage.setItem("products_query","kidsjackets/")
    location.href="../Html/ProductPage.html"
    return;
  }  else if(str4.includes(userInput)){
    localStorage.setItem("products_query","menshoose/")
    location.href="../Html/ProductPage.html"
    return;
  } 

});


// drop downmenu links redirecting
let redir_cate=document.getElementsByClassName("categ");
redir_cate[0].addEventListener("click",()=>{
  localStorage.setItem("products_query","menjackets/")
    location.href="../Html/ProductPage.html"
})
redir_cate[1].addEventListener("click",()=>{
  localStorage.setItem("products_query","womentshirt/")
  location.href="../Html/ProductPage.html"
})
redir_cate[2].addEventListener("click",()=>{
  localStorage.setItem("products_query","kidsjackets/")
  location.href="../Html/ProductPage.html"
})
redir_cate[3].addEventListener("click",()=>{
  localStorage.setItem("products_query","menshoose/")
    location.href="../Html/ProductPage.html"
})

// Get all the li elements with the class name "workingLinks"
const workingLinks = document.querySelectorAll('.workingLinks');

// Loop through each li element and add an onclick event listener
workingLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Get the text content of the clicked li element
    const Page = link.dataset.page;
    if(Page=="men-page"){
      localStorage.setItem("products_query","menjackets/")
      location.href="../Html/ProductPage.html"
      return;
    }else if(Page=="women-page"){
      localStorage.setItem("products_query","womentshirt/")
      location.href="../Html/ProductPage.html"
      return;
    } else if(Page=="kids-page"){
      localStorage.setItem("products_query","kidsjackets/")
      location.href="../Html/ProductPage.html"
      return;
    }  else if(Page=="men-shoose-page"){
      localStorage.setItem("products_query","menshoose/")
      location.href="../Html/ProductPage.html"
      return;
    }  else if(Page=="shoose-page"){
      localStorage.setItem("products_query","menshoose/")
      location.href="../Html/ProductPage.html"
      return;
    } 
    
  });
});