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


const header = document.getElementsByClassName("header");
const toggle = document.getElementsByClassName("toggle");
const content = document.getElementsByClassName("content");
for(let i=0;i<header.length;i++){
    header[i].addEventListener("click", () => {
        content[i].classList.toggle("selected");
      toggle[i].textContent = content[i].classList.contains("selected") ? "-" : "+";
    });
}
let baseurl = "https://misty-fedora-clam.cyclic.app/";

let items;
let Query_p=localStorage.getItem("products_query")
  if(Query_p==""||Query_p==null){
    Query_p="womentshirt/"
  }
fetchdata(Query_p)
async function fetchdata(url) {
    try {
      const response = await fetch(`${baseurl}${url}`);
      const data = await response.json();
      items=data;
      render_products(data)
    } catch (error) {
      console.log({ msg: "something went wrong", error: error.message });
      return {};
    }
  }

// fetching footweares

async function fetchfootwear() {
  try {
    const response = await fetch(`${baseurl}menshoose/`);
    const data = await response.json();
    render_products(data)
  } catch (error) {
    console.log({ msg: "something went wrong", error: error.message });
    return {};
  }
}

// fetching footweares ends here




function render_products(data){
  document.getElementById("productsdiv").innerHTML=null;
    data.forEach((el,index) => {
const outerDiv = document.createElement("div");
outerDiv.classList.add("product_card");
// create the first inner div element and append the image
const innerDiv1 = document.createElement("div");
const image = document.createElement("img");
image.src =el.img[0];
image.alt = "image_product";
innerDiv1.append(image);

// create the second inner div element and append the heading
const innerDiv2 = document.createElement("div");
const heading = document.createElement("h2");
heading.textContent =el.title;
innerDiv2.append(heading);

// create the third inner div element and append the prices
const innerDiv3 = document.createElement("div");
const price1 = document.createElement("p");
price1.textContent =`$ ${el.price[0]}`;
const price2 = document.createElement("p");
price2.textContent =`$ ${el.price[1]}`;
innerDiv3.append(price1,price2);

// create the fourth inner div element and append the ratings
const innerDiv4 = document.createElement("div");
innerDiv4.classList.add("ratingsdiv");
for (let i = 0; i < el.rating; i++) {
  const star = document.createElement("i");
  star.classList.add("fa-solid", "fa-star");
  innerDiv4.append(star);
}

// append all the inner div elements to the outer div element
outerDiv.append(innerDiv1,innerDiv2,innerDiv3,innerDiv4);
outerDiv.addEventListener("click",()=>{
  localStorage.setItem("Product_to_view",JSON.stringify(el))
  window.location.href = "./singleProductpage.html";
})
// append the outer div element to the body of the HTML document
document.getElementById("productsdiv").append(outerDiv);

    });
}

//changing the type product text
let typeP=document.getElementById("jackets-checkbox");
let jacklable=document.getElementById("jacklable");
if(Query_p=="menjackets/"){
  typeP.innerText="Jackets"
  typeP.setAttribute("value","Jackets")
}else if(Query_p=="womentshirt/"){
  typeP.innerText="T-Shirt"
  typeP.setAttribute("value","T-Shirt")
}else if(Query_p=="kidsjackets/"){
  typeP.innerText="Kids-Jackets"
  typeP.setAttribute("value","Kids-Jackets")
}else if(Query_p=="menshoose/"){
  typeP.style.display="none"
  jacklable.style.display="none"
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

//search functionality header

const searchInput = document.getElementById("search");
const searchButton = document.querySelector(".fa-magnifying-glass");

searchButton.addEventListener("click",()=>{
  console.log(items)
  let userInput = searchInput.value;
  if(userInput==""){
    render_products(items);
    return;
  }else if (!isNaN(userInput)) {
  userInput = Math.floor(userInput);
} else {
  userInput = userInput.toLowerCase();
}
 let new_data=items.filter((item) => {
    const title = item.title.toLowerCase();
    const price = Math.floor(item.price[0]);
    const color = item.color[0].c.toLowerCase();
    const rating = item.rating;

    if (
      title.includes(userInput) ||
      price==(userInput) ||
      color.includes(userInput) ||
      rating==(userInput)
    ) {
      return item;
    } 
  });
  if(new_data.length>0){
    render_products(new_data)
  }else{
    alert("Sorry ! No products found")
  }
});
// extra variable for modifying or sorting 

//sorting the data
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change",(e)=>{
    const targetCheckbox = e.target;
    let check_b_value=e.target.value;
    if (targetCheckbox.checked) {
      if (check_b_value === "Jackets" || check_b_value === "T-Shirt" || check_b_value === "Kids-Jackets") {
        render_products(items);
      } else if (check_b_value === "footwear") {
        fetchfootwear();
      } else if (check_b_value === "topr") {
        let newitems=items.filter((el) => el.rating>4);
        render_products(newitems);
      }  else if (check_b_value === "u50") {
        let newitems=items.filter((el) => el.price[0]<50);
        render_products(newitems);
      } else if (check_b_value === "u100") {
        let newitems_1=items.filter((el) => el.price[0]<100);
        render_products(newitems_1);
      }else if (check_b_value === "u150") {
        let newitems_2=items.filter((el) => el.price[0]<150);
        render_products(newitems_2);
      }else if (check_b_value === "g150") {
        let newitems_3=items.filter((el) => el.price[0]>150);
        render_products(newitems_3);
      }else if (check_b_value === "l2h") {
        let sub_items=items;
        let newitems_4=sub_items.sort((a,b) =>{
          if (Number(a.price[0]) < Number(b.price[0])) {
            return -1;
          } else if (Number(a.price[0]) > Number(b.price[0])) {
            return 1;
          } else {
            return 0;
          }
        });
        render_products(newitems_4);
      }else if (check_b_value === "h2l") {
        let sub_items2=items;
        let newitems_5=sub_items2.sort((a,b) =>{
          if (Number(a.price[0]) < Number(b.price[0])) {
            return 1;
          } else if (Number(a.price[0]) > Number(b.price[0])) {
            return -1;
          } else {
            return 0;
          }
        });
        // for(let i=0;i<newitems_5.length;i++){
        //   console.log(newitems_5[i].price[0])
        // }
        render_products(newitems_5);
      }
    } else {
      render_products(items);
    }


  });
});

//// Get all the droplet elements
const droplets = document.querySelectorAll(".fa-droplet");
droplets.forEach((droplet) => {
  droplet.addEventListener("click", (event) => {
    // Get the color of the clicked droplet
    const Color = event.target.id;
    let newitems=items.filter((el) =>{

     if(el.color.length>1){
      if(el.color[0].c==Color||el.color[1].c==Color){
        return el;
      }
     }else{
      if(el.color[0].c==Color){
        return el;
      }
     }

    });
    if(newitems.length>0){
      render_products(newitems);
    }else{
      alert(`Sorry No Products availble with Color: ${Color}`)
    }
  });
});



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
