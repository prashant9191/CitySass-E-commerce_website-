let boxDropdown = document.querySelectorAll('.boxDropdown');
for (let x = 0; x < document.querySelectorAll('li.categ').length; x++) {
    let list = document.querySelectorAll('li.categ')[x];
    let boxDropdown_list =  document.querySelectorAll('.boxDropdown')[x];
    list.addEventListener('mouseenter',() =>{
        boxDropdown_list.style.display = 'block';
        // swal("start","","warning")
    })
    list.addEventListener('mouseleave',() =>{
        boxDropdown_list.style.display = 'none';
    })
}
for (let x = 0; x < boxDropdown.length; x++) {
    const box = boxDropdown[x];
    box.addEventListener('mouseenter',() =>{
        box.style.display = 'block';
    })
    box.addEventListener('mouseleave',() =>{
        box.style.display = 'none';
    })
}


// side navbar js
let sidenavbarbtn=document.getElementById("sliderbutton")
let fixednavbar=document.getElementById("fixedheadertop")
let maincont=document.getElementById("banner")

sidenavbarbtn.addEventListener("click",()=>{
  let sactivebtn=document.querySelector(".sliderbtn");
  if(sactivebtn.classList.contains("active")) {
    fixednavbar.style.display="block"
    maincont.style.marginTop="90px"
  } else{
    fixednavbar.style.display="none";
    maincont.style.marginTop = '50px';
  }
})


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


// adding onclick on product silder
let productSlider=document.getElementsByClassName("product__")
let shopSkibtn=document.getElementById("shopSkibtn")
let banner=document.getElementById("banner")
let women__slider=document.getElementsByClassName("women__slider")
let kids__=document.getElementsByClassName("kids__")
let foot_wear=document.getElementsByClassName("foot_wear")
shopSkibtn.addEventListener("click",()=>{
  localStorage.setItem("products_query","menjackets/")
  location.href="./Html/ProductPage.html"
})
for(let i=0;i<productSlider.length;i++){
  productSlider[i].addEventListener("click",()=>{
    localStorage.setItem("products_query","menjackets/")
    location.href="./Html/ProductPage.html"
  })
}
for(let i=0;i<women__slider.length;i++){
  women__slider[i].addEventListener("click",()=>{
    localStorage.setItem("products_query","womentshirt/")
    location.href="./Html/ProductPage.html"
  })
}
for(let i=0;i<kids__.length;i++){
  kids__[i].addEventListener("click",()=>{
    localStorage.setItem("products_query","kidsjackets/")
    location.href="./Html/ProductPage.html"
  })
}
for(let i=0;i<foot_wear.length;i++){
  foot_wear[i].addEventListener("click",()=>{
    localStorage.setItem("products_query","menshoose/")
    location.href="./Html/ProductPage.html"
  })
}
banner.addEventListener("click",()=>{
  localStorage.setItem("products_query","menshoose/")
  location.href="./Html/ProductPage.html"
})