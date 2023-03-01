var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");

function toggleSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar_responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar_responsive");
    sidebarOpen = false;
  }
}

// add and update btn for respective forms
let add_pro = document.getElementById("add_product_btn");
let up_pro = document.getElementById("update_product_btn");
add_pro.addEventListener("click", () => {
  let addp = document.getElementsByClassName("add_product")[0];
  addp.classList.toggle("active");
  if (addp.classList.contains("active")) {
    addp.style.display = "block";
  } else {
    addp.style.display = "none";
  }
});
up_pro.addEventListener("click", () => {
  let addp = document.getElementsByClassName("update_product")[0];
  addp.classList.toggle("active");
  if (addp.classList.contains("active")) {
    addp.style.display = "block";
  } else {
    addp.style.display = "none";
  }
});

let baseurl = "https://misty-fedora-clam.cyclic.app/";

let url = "menjackets/";
let women_url = "womentshirt/";
let kids_url = "kidsjackets/";
let footwear_url = "menshoose/";

let totalproducts = 0;
var men_products_ = 0;
let women_products_ = 0;
let kids_products_ = 0;
let footwear_products_ = 0;
let user_logged=JSON.parse(localStorage.getItem("user"));
 if(user_logged[0].name=="admin" && user_logged[0].email=="admin@gmail.com"){
  Promise.all([
    fetchdata(url, "tbody_"),
    fetchdata(women_url, "tbody_women"),
    fetchdata(kids_url, "tbody_Kids"),
    fetchdata(footwear_url, "tbody_footwear"),
  ]).then(([{ tbody_ }, { tbody_women }, { tbody_Kids }, { tbody_footwear }]) => {
    document.getElementById("totproducts").innerText = totalproducts;
    document.getElementById("menproducts_").innerText = tbody_.numProducts;
    document.getElementById("women_pro_").innerText = tbody_women.women_products_;
    document.getElementById("kids_pro").innerText = tbody_Kids.kids_products_;
    document.getElementById("foot_wear").innerText =
      tbody_footwear.footwear_products_;
  });
 }else{
  document.getElementById("admin_welcome").innerText="Unauthorised user Please login using Admin's credentials"
  document.getElementById("admin_name_h1").innerText="Unauthorised user"
  document.getElementById("admin_img").style.display="none"
  alert("You will not be able to perform any action. Please login via admin's user")
 }


async function fetchdata(url, selector) {
  try {
    const response = await fetch(`${baseurl}${url}`);
    const data = await response.json();
    rendertable(data, document.getElementById(selector), url);
    const numProducts = data.length;
    totalproducts += numProducts;
    let obj = {};
    obj[`${selector}`] = { data, numProducts };
    if (selector == "tbody_") {
      obj[`${selector}`].men_products_ = numProducts;
    } else if (selector == "tbody_women") {
      obj[`${selector}`].women_products_ = numProducts;
    } else if (selector == "tbody_Kids") {
      obj[`${selector}`].kids_products_ = numProducts;
    } else if (selector == "tbody_footwear") {
      obj[`${selector}`].footwear_products_ = numProducts;
    }
    return obj;
  } catch (error) {
    console.log({ msg: "something went wrong", error: error.message });
    return {};
  }
}

function rendertable(data, selector, url) {
  let s = 1;
  data.forEach((el, index) => {
    let tr = document.createElement("tr");
    let sno = document.createElement("td");
    sno.innerText = s++;
    let productid = document.createElement("td");
    productid.innerText = el._id;
    let img = document.createElement("td");
    let imgtag = document.createElement("img");
    imgtag.setAttribute("src", el.img[0]);
    imgtag.setAttribute("width", "50px");
    img.append(imgtag);
    let name = document.createElement("td");
    name.innerText = el.title;
    let price = document.createElement("td");
    price.innerText = `$ ${el.price[0]}`;
    let Rating = document.createElement("td");
    Rating.innerText = el.rating;
    let update = document.createElement("td");
    update.innerText = "Update";
    update.addEventListener("click", () => {
      let up_pro = document.getElementById("update_product_btn");
      let addp = document.getElementsByClassName("update_product")[0];
      addp.classList.toggle("active");
      if (addp.classList.contains("active")) {
        addp.style.display = "block";
      } else {
        addp.style.display = "none";
      }
    });
    let delet = document.createElement("td");
    delet.innerText = "Delete";
    delet.addEventListener("click", () => {
      fetch(`${baseurl}${url}delete/${el._id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          // Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          alert("Product DELETED");
          setTimeout(() => {
            location.reload();
          }, 100);
        })
        .catch((err) => console.log(err));
    });
    tr.append(sno, productid, img, name, price, Rating, update, delet);
    selector.append(tr);
  });
}

// function updating
const form_ADD = document.querySelector("#addproduct");
if(user_logged[0].name=="admin" && user_logged[0].email=="admin@gmail.com"){
 form_ADD.addEventListener("submit", (event) => {
  event.preventDefault();

  const images = [
    document.querySelector("#image1").value,
    document.querySelector("#image2").value,
    document.querySelector("#image3").value,
  ];
  const title = document.querySelector("#productName").value;
  const price = [
    document.querySelector("#salePrice").value,
    document.querySelector("#offerPrice").value,
  ];
  const offer = "Sale";
  const rating = parseInt(document.querySelector("#rating").value);
  const userreviews = 0;
  const color = [
    {
      c: "Black, Cordovan",
      imgs: [
        "https://columbia.scene7.com/is/image/ColumbiaSportswear2/1746011_013_f?wid=768&hei=806&v=1676388993",
        "https://columbia.scene7.com/is/image/ColumbiaSportswear2/1746011_013_u?wid=768&hei=806&v=1676388993",
        "https://columbia.scene7.com/is/image/ColumbiaSportswear2/1746011_013_o?wid=768&hei=806&v=1676388993",
        "https://columbia.scene7.com/is/image/ColumbiaSportswear2/1746011_013_m?wid=768&hei=806&v=1676388993",
      ],
    },
  ];
  const size = ["S", "M", "L", "XL", "XXL"];
  const details = [
    document.querySelector("#detailHeading").value,
    document.querySelector("#detailContent").value,
  ];
  const listpoints = [
    document.querySelector("#extra1").value,
    document.querySelector("#extra2").value,
    document.querySelector("#extra3").value,
  ];
  const fabric = [
    document.querySelector("#fabric_o").value,
    document.querySelector("#fabric_t").value,
    document.querySelector("#fabric_th").value,
  ];
  const reviews = [
    {
      username: "Ken King",
      review:
        "Great Looking with lots of Color. Can go with lots of clothing options.",
    },
  ];

  const productObj = {
    img: images,
    title,
    price,
    offer,
    rating,
    userreviews,
    color,
    size,
    details,
    listpoints,
    fabric,
    reviews,
  };

  let query = document.getElementById("prourltoadd").value;
  if (query == "m" || query == "M") {
    addproductsadmin("menjackets/", "Men's");
  } else if (query == "w" || query == "W") {
    addproductsadmin("womentshirt/", "Women's");
  } else if (query == "k" || query == "K") {
    addproductsadmin("kidsjackets/", "Kid's");
  } else if (query == "f" || query == "F") {
    addproductsadmin("menshoose/", "Footwear");
  }

  function addproductsadmin(newurl, category_url) {
    fetch(`${baseurl}${newurl}create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        //  'Authorization':`${localStorage.getItem("token")}`
      },
      body: JSON.stringify(productObj),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert(`Product Added to ${category_url} Category`);
        setTimeout(() => {
          location.reload();
        }, 100);
      })
      .catch((err) => console.log(err));
  }
});

 }else{
 }

const form_product_update = document.querySelector("#updateproduct");
// const submitButton = form.querySelector('.sub_btn');


if(user_logged[0].name=="admin" && user_logged[0].email=="admin@gmail.com"){
  form_product_update.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent form submission   
    const img = [];
   let i1=document.querySelector("#table2_image1").value;
   let i2=document.querySelector("#table2_image2").value;
   let i3=document.querySelector("#table2_image3").value;
   if(i1)img.push(i1)
   if(i2)img.push(i2)
   if(i3)img.push(i3) 
    const title = document.querySelector("#table2_productName").value;
    const price = [];
    let p1=document.querySelector("#table2_salePrice").value;
    let p2=document.querySelector("#table2_offerPrice").value;
    if(p1)price.push(p1)
    if(p2)price.push(p2)
    const rating = parseInt(document.querySelector("#table2_rating").value);
    const details = [
      document.querySelector("#table2_detailHeading").value,
      document.querySelector("#table2_detailContent").value,
    ];
    const listpoints = [
      document.querySelector("#table2_extra1").value,
      document.querySelector("#table2_extra2").value,
      document.querySelector("#table2_extra3").value,
    ];
    const fabric = [
      document.querySelector("#table2_fabric_o").value,
      document.querySelector("#table2_fabric_t").value,
      document.querySelector("#table2_fabric_th").value,
    ];
    // set to empty array for now
    let productsuniqId = document.getElementById("productsuniqid").value;
    // create the product object
    const product = {
      img,
      title,
      price,
      rating,
      details,
      listpoints,
      fabric
    };
    let query = document.getElementById("up_date_cate").value;
    if (query == "m" || query == "M") {
      Update_productsadmin("menjackets/", "Men's");
    } else if (query == "w" || query == "W") {
      Update_productsadmin("womentshirt/", "Women's");
    } else if (query == "k" || query == "K") {
      Update_productsadmin("kidsjackets/", "Kid's");
    } else if (query == "f" || query == "F") {
      Update_productsadmin("menshoose/", "Footwear");
    }
    function Update_productsadmin(newurl, category_url) {
      fetch(`${baseurl}${newurl}update/${productsuniqId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          alert(
            `Product with id:${productsuniqId} Updated to ${category_url} Category`
          );
          setTimeout(() => {
            location.reload();
          }, 100);
        })
        .catch((err) => console.log(err));
    }
  
    // do something with the product object, e.g. send it to a server for processing
  });
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

if(user_logged[0].name=="admin" && user_logged[0].email=="admin@gmail.com"){
  total_users()
  async function total_users(){
    try {
      let allusers= await fetch(`${baseurl}user/alluser`);
      let data= await allusers.json();
      document.getElementById("totuser").innerText=data.length;
    } catch (error) {
      console.log(error)
    }
  }
}else{
}

