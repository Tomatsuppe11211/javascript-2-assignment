console.log('Start ts file')


const userEmail = document.getElementById('loginEmail') as HTMLInputElement
const userPassword = document.getElementById('loginPassword') as HTMLInputElement
const loginButton = document.getElementById('loginButton') as HTMLButtonElement

loginButton.addEventListener("click", function(e){
    e.preventDefault()
    
    if(userEmail.value === ""){
        console.log('Email not entered')
        return
    } else if (userPassword.value === ""){
        console.log('Password not entered')
    } else {
        console.log(`Email: ${userEmail.value}, Password: ${userPassword.value}`)
    }
})