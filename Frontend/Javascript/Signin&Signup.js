const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

fistForm.addEventListener("submit", (e) =>{
	e.preventDefault();
	let obj={
		 name:fistForm.name.value,
		 email:fistForm.email.value,
		 password:fistForm.password.value,
		 gender:fistForm.gender.value,
		 age:parseInt(fistForm.age.value),
		 address:fistForm.add.value
	}
	console.log(obj)
	fetch("https://misty-fedora-clam.cyclic.app/user/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(obj)
    }).then(res=>res.json())
    .then(res=>{
        console.log(res)
        if(res.ok){
          alert("User Registered Successfully")
        }else{
          alert(`${res.msg}`)
        }
    })
    .catch(err=>console.log(err))
});
secondForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let obj={	
		email:secondForm.semail.value,
		password:secondForm.spassword.value
   }
   console.log(obj)
   fetch("https://misty-fedora-clam.cyclic.app/user/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(obj)
    }).then(res=>res.json())
    .then(res=>{
        console.log(res)
        localStorage.setItem("token",res.Token)
        localStorage.setItem("user",JSON.stringify(res.user))
        if(res.ok){
          alert("User Logged-in Successfully")
          location.href="../index.html"
        }else{
          alert(`${res.msg}`)
        }
    })
    .catch(err=>console.log(err))
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