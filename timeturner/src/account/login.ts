
const BASE_URL = 'https://v2.api.noroff.dev'

const userEmail = document.getElementById('loginEmail') as HTMLInputElement
const userPassword = document.getElementById('loginPassword') as HTMLInputElement
const loginButton = document.getElementById('loginButton') as HTMLButtonElement
const message = document.getElementById('loginMessage') as HTMLElement


type currentUser = {
        email: string,
        password: string
    }


loginButton.addEventListener("click", async function(e){
    e.preventDefault()

    if(userEmail.value === "" || userPassword.value === ""){
        message.style.display = 'block'
        message.innerHTML = 'Email or password cannot be blank'
        throw new Error('Email or password cannot be blank')
    } 
    
    const currentUser = {
        email: userEmail.value,
        password: userPassword.value
    }

    try {
        const response = await fetch(BASE_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: currentUser.email,
                password: currentUser.password
            })
        })

        if(!response.ok){
            throw new Error('Login failed')
        }

        const data = await response.json()
        console.log('data: ', data)
        
        message.style.color = '#3bff93ff'
        message.style.display = 'block'
        message.style.webkitTextStroke = '0.5px #000'
        message.innerHTML = 'Logged in successfully'

        setTimeout(() => {
            window.location.href = '../index.html'
        }, 2000);
        

        return data

        
    } catch(error){
        message.style.display = 'block'
        message.innerHTML = "Username or password is wrong"
        
        console.error('Error: User unauthorized')
    }
})