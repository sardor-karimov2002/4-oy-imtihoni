var emailInputEl=document.querySelector('.form__email__input')
var passwordInputEl=document.querySelector('.form__password__input')
var notificationEl=document.querySelector('.notifications')
var loginFormEl=document.querySelector('.login__form')
var alerTemplate=document.querySelector('#alert-template').content
const API='https://reqres.in/api'
// https://www.googleapis.com/books/v1/volumes?q=search+terms
//

function login(credentials){
    return new Promise((resolve,reject)=>{

        fetch(`${API}/login`,{
            method:'POST',
            headers:{
                "content-type":'application/json'
            },
            body:JSON.stringify(credentials)
        })
        
        .then(res=>{
            if(res.status===400)reject(res)
            return res.json()
        })
        .then(res =>{
            console.log(res)
            alert(res)
            if(res.token){
                window.localStorage.setItem('token',res.token)
                window.location.replace('index.html')
            } 
            reject("xato kiritingiz emailni"+ res)
            
        })
        .catch(err =>{
            alert(err)
            alert(response.error)
        })
    })
    
}

// eve.holt@reqres.in
loginFormEl.addEventListener('submit', event =>{
    event.preventDefault()
    const body={
        email:emailInputEl.value,
        password:passwordInputEl.value
    }

    try {
        login(body)
    } catch (error) {
        alert(error)
    }

})
