const nameInput = document.getElementById('Name');
const emailInput = document.getElementById('Email');
const passwordInput = document.getElementById('Password');
const ageInput = document.getElementById('age');
const Register = document.getElementById('Register');


let user={name:'',
email:'',
password:'',
age:''
};

nameInput.addEventListener("keyup", function(e)
{
   
    user.name=e.target.value
  
});
emailInput.addEventListener('keyup',function(e)
{
    user.email=e.target.value
    
});
passwordInput.addEventListener('keyup',function(e)
{
    user.password=e.target.value
    
});
ageInput.addEventListener('keyup', function(e){
    user.age=e.target.value

})
Register.addEventListener('click', async function(e)
{
   
    e.preventDefault();
 await axios.post('https://api-nodejs-todolist.herokuapp.com/user/register',user).then(res=>{
     window.location.href = "signin.html"
 }
 
 
 )

 .catch(function (err) {
   
    document.getElementById('response').innerHTML=err;
  })


  });