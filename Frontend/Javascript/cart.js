let subtotal=document.getElementById("subtotal");
let subtotal_items=document.getElementById("subtotal-items");
let estimated_shipping=document.getElementById("estimated-shipping");
let tax=document.getElementById("tax");
let alert_here=document.getElementById("alert-here");
let order_total=document.getElementById("order-total");
let st=0;
let es=0;
let et=0;
let ot=0;

let displayCard=document.getElementById("item-cards");
let baseurl=`https://misty-fedora-clam.cyclic.app/`
let url=`cart`;
async function fetchdata(url){
    try {
        let res=await fetch(`${baseurl}${url}`,{
          method: "GET",
         headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
      }
        });
        let data=await res.json();
        if(data.length===0){
            alert_here.innerText="Your cart is Empty! Visit Products Page to add products to cart"
        }else{
            ordersummary(data)
            displayData(data);
            localStorage.setItem("cart_data_checkout",JSON.stringify(data))
        }
       
    } catch (error) {  
        console.log(error)
    }
}
fetchdata(url)

function displayData(data){
    displayCard.innerHTML=null;
    data.forEach((ele)=>{
  
        let outerDiv=document.createElement("div");
        outerDiv.classList.add("outerDiv");
        // add image here
        let img=document.createElement("img");
        img.src=ele.img[0];
        outerDiv.append(img);
        //image end here
        //..........................||||||........................|||||||...............................................
        //innerDiv for produnct information
        let innerDiv=document.createElement("div");
        innerDiv.classList.add("innerDiv");

        let brand=document.createElement("h3");
        brand.innerText=ele.title;

        let title=document.createElement("p");
        title.innerText=ele.fabric[0];

        let size=document.createElement("p");
        size.innerText=`Size: ${ele.size}`;

        let type=document.createElement("p");
        type.innerText=`Rating: ${ele.rating}`;

        //innerDiv end here
        //..........................||||||........................|||||||...............................................
        // add select tag for qty

        let select=document.createElement("select")  
        select.classList.add("Quantity_pro");
        select.innerText="Qty:"
        let currentQuantity = ele.quantity || 1;
        for (let i = 1; i <= 5; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.innerText = `Qty:${i}`;
            select.append(option);
          
            if (i === currentQuantity) {
              option.selected = true; // set the default selected option
            }
          }
        // select.value = data.quantity;
        select.addEventListener("change", (e)=>{
            let q=e.target.value;
            let obj={quantity:Number(q)}
            fetch(`${baseurl}cart/update/${ele._id}`, {
                method: "PATCH",
                headers: {
                  "Content-type": "application/json",
                  //  'Authorization':`${localStorage.getItem("token")}`
                },
                body: JSON.stringify(obj),
              })
                .then((res) => res.json())
                .then((res) => {
                  console.log(res);
                  alert(
                    `Quentity in Product with id:${ele._id} Updated `
                  );
                  setTimeout(() => {
                    location.reload();
                  }, 100);
                })
                .catch((err) => console.log(err));


          });


        // add select tag for qty end here

        //..........................||||||........................|||||||...............................................
        //price div which is in right side
        let rightDiv=document.createElement("div");
        rightDiv.classList.add("rightDiv");

        let price=document.createElement("p");
        price.innerText=`$${ele.price[0]*ele.quantity}`;

        let button=document.createElement("button");
        button.innerText="Remove"

        button.addEventListener("click",()=>{
            deletecard(ele._id);
            outerDiv.remove();
        })
        innerDiv.append(brand,title,size,type)
        rightDiv.append(price,button)
        //price div which is in right side end here
        outerDiv.append(innerDiv,select,rightDiv)
        displayCard.append(outerDiv)
    })
}

async function deletecard(id){
    try {
        let res = await fetch(`${baseurl}${url}/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
        })
        let data = await res.json();
        alert("Product Removed !")
        setTimeout(()=>{
          location.reload();
        },100)
    } catch (error) {
        console.log(error)
    }
}



function ordersummary(data){
for(let i=0;i<data.length;i++){
        st+=data[i].quantity*data[i].price[0]
}
subtotal.innerText=Math.floor(st);
subtotal_items.innerText=data.length;
if(st>140){
    estimated_shipping.innerText="Free"
    alert_here.innerText="YOU WILL NOT BE CHARGED SHIPPING CHARGES"
}else{
    es=Math.floor(st*(3/100))
    if(es<5){
      es=5;
      estimated_shipping.innerText=`$ 5`
    }else{
      estimated_shipping.innerText=`$ ${es}`
    }
}
tax.innerText=Math.floor(st*(1/20))
et=Math.floor(st*(1/20));
order_total.innerText=Math.floor(st+es+et);
ot=st+es+et;
let cout={
    amt:ot,
}

localStorage.setItem("checkout",JSON.stringify(cout))
}

document.getElementById("coupon-btn").addEventListener("click",()=>{
    let couponcode=document.getElementById("apply-coupon-input").value;
    if(couponcode=="10%OFF"||couponcode=="FIRST"){
        order_total.innerText=Math.floor((ot-ot*(1/10)).toFixed(2));
        ot=Math.floor(ot-ot*(1/10))
        let cout={
            amt:ot
        }   
        localStorage.setItem("checkout",JSON.stringify(cout))
    }
})

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
