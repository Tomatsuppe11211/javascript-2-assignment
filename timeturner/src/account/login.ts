console.log('login.ts loaded...')
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
    
    const currentUser: currentUser = {
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
        
        const data = await response.json()
        const userData = data.data || data

        const loggedInUser = {username: userData.name}

        if(!response.ok){
            const errorMessage = data.errors?.[0]?.message || data.message || 'Login failed'
            
            message.style.display = 'block'
            message.innerHTML = errorMessage
            return
        }
        
        message.style.color = '#3bff93ff'
        message.style.display = 'block'
        message.style.webkitTextStroke = '0.5px #000'
        message.innerHTML = 'Logged in successfully'

        localStorage.setItem('currentUser', JSON.stringify(loggedInUser))
        localStorage.setItem('profileData', JSON.stringify(userData))

        setTimeout(() => {
            window.location.href = '../index.html' //change to feed page
        }, 2000);
        
        return data

    } catch(error){
        message.style.display = 'block'
        message.innerHTML = "Username or password is wrong"
        
        console.error('Error: User unauthorized')
    }
})