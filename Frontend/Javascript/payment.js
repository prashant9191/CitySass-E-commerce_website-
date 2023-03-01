
new Vue({
    el: "#app",
    data() {
      return {
        currentCardBackground: Math.floor(Math.random() * 25 + 1), // just for fun :D
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
        minCardYear: new Date().getFullYear(),
        amexCardMask: "#### ###### #####",
        otherCardMask: "#### #### #### ####",
        cardNumberTemp: "",
        isCardFlipped: false,
        focusElementStyle: null,
        isInputFocused: false
      };
    },
    mounted() {
      this.cardNumberTemp = this.otherCardMask;
      document.getElementById("cardNumber").focus();
    },
    computed: {
      getCardType() {
        let number = this.cardNumber;
        let re = new RegExp("^4");
        if (number.match(re) != null) return "visa";
  
        re = new RegExp("^(34|37)");
        if (number.match(re) != null) return "amex";
  
        re = new RegExp("^5[1-5]");
        if (number.match(re) != null) return "mastercard";
  
        re = new RegExp("^6011");
        if (number.match(re) != null) return "discover";
  
        re = new RegExp('^9792')
        if (number.match(re) != null) return 'troy'
  
        return "visa"; // default type
      },
      generateCardNumberMask() {
        return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
      },
      minCardMonth() {
        if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
        return 1;
      }
    },
    watch: {
      cardYear() {
        if (this.cardMonth < this.minCardMonth) {
          this.cardMonth = "";
        }
      }
    },
    methods: {
      flipCard(status) {
        this.isCardFlipped = status;
      },
      focusInput(e) {
        this.isInputFocused = true;
        let targetRef = e.target.dataset.ref;
        let target = this.$refs[targetRef];
        this.focusElementStyle = {
          width: `${target.offsetWidth}px`,
          height: `${target.offsetHeight}px`,
          transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
        }
      },
      blurInput() {
        let vm = this;
        setTimeout(() => {
          if (!vm.isInputFocused) {
            vm.focusElementStyle = null;
          }
        }, 300);
        vm.isInputFocused = false;
      }
    }
  });



  let cnum=document.getElementById("cardNumber");
  let cname=document.getElementById("cardName");
  let cmonth=document.getElementById("cardMonth");
  let cyear=document.getElementById("cardYear");
  let cvv=document.getElementById("cardCvv");
  let submitbtn=document.getElementById("subbtn");
  submitbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(cnum.value=="" || cname.value=="" || cmonth.value=="" || cyear.value=="" || cvv.value=="")  swal("PLEASE FILL ALL DETAILS","","warning")
    else{ 
      swal("PAYMENT SUCCESSFUL","","success") 
      setTimeout(() => {
        location.href = "../index.html";
      }, 2000);
    }

  })
  