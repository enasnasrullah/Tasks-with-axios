
const signinemail = document.getElementById('signinemail');
const signinpassword = document.getElementById('signinpassword');
const signin = document.getElementById('signin');



  let usersignin={
email:'',
password:'',

};




signinemail.addEventListener('keyup',function(e)
{
    usersignin.email=e.target.value
    
    
});
signinpassword.addEventListener('keyup',function(e)
{
    usersignin.password=e.target.value
});

signin.addEventListener('click', async function(e)
{
   
    e.preventDefault();
  await axios.post('https://api-nodejs-todolist.herokuapp.com/user/login',usersignin)
 .then(res=>{localStorage.setItem('token',res.data.token);
    window.location.href = "./index.html"}
 )
  
}
 
 )