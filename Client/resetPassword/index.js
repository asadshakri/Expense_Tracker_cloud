const backend_url="http://13.127.54.39";

function resetLink(event)
{
    event.preventDefault();
    const email=event.target.email.value;
    axios.post(`${backend_url}/password/forgotPassword`,{email})
    .then((response)=>{
        alert(response.data.message);
        console.log("reset Link send");
    }).catch((err)=>{
        if(err.response)
        alert(err.response.data.message)
        console.log("error")});

}