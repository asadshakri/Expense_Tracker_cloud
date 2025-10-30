const backend_url="http://15.206.210.208";

function showLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    const span=document.getElementById("message2");
    span.innerHTML=""
  }

  function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
    const span=document.getElementById("message1");
    span.innerHTML=""
  }


  function addUser(event){
    event.preventDefault();
    const name=event.target.name.value;
    const email=event.target.email.value;
    const password=event.target.passwd.value;
    const span=document.getElementById("message1");
    span.innerHTML="";
    const userDetails={name,email,password,premiumMember:false};
    
    axios.post(`${backend_url}/user/add`,userDetails).then((response)=>{
         
  
            alert(response.data.message);

    }).catch((error)=>{

      if(error.response.status=="409")
        {
          const span=document.getElementById("message1");
    
          span.innerHTML=`${error.response.data.message}`
          span.style.color="red";
        }
     else{
           console.log(error);
     }
    })
 event.target.reset();
  }

  function loginUser(event){
    event.preventDefault();
    const email=event.target.email.value;
    const password=event.target.passwd.value;
    const userDetails={email,password};
    const span=document.getElementById("message2");
    span.innerHTML="";
    axios.post(`${backend_url}/user/login`,userDetails).then((response)=>{
      alert(response.data.message);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("email",email);
      window.location.href = "../Expense/expense.html";

    }).catch((error)=>{
      if(error.response.status=="404" || error.response.status=="401")
      {
         span.innerHTML=`${error.response.data.message}`
         span.style.color="red";
      }
    })
    event.target.reset();
  }

  function forgotPassword(){
    window.location.href="../resetPassword/reset.html"
  }


  window.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.getItem("token"))
      window.location.href = "../Expense/expense.html";

  })