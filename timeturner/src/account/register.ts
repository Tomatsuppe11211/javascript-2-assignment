const BASE_URL = "https://v2.api.noroff.dev"

const username = document.getElementById("username") as HTMLInputElement
const email = document.getElementById("email") as HTMLInputElement
const password = document.getElementById("password") as HTMLInputElement
const confirmedPassword = document.getElementById("confirmPassword") as HTMLInputElement
const button = document.getElementById("registerButton") as HTMLButtonElement
const message = document.getElementById("registerMessage") as HTMLElement

type newProfile = {username: string, email: string}


button.addEventListener('click', async function(e){
    e.preventDefault()

    if(
        !username.value || 
        !email.value ||
        !password.value ||
        !confirmedPassword.value
    ){
        message.style.display = 'block'
        message.innerHTML = 'At least one input field is empty'
        console.log('At least one input field is empty!')
        return
    } else {
        
        if(password.value !== confirmedPassword.value){
            message.style.display = 'block'
            message.innerHTML = "Passwords do not match"
            
            console.log('Passwords do not match')
            return
        }
        
        try{
            const response = await fetch(BASE_URL + '/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: username.value,
                    email: email.value,
                    password: password.value
                })
            })
                
            const data = await response.json()

            const userData = data.data || data
            localStorage.setItem('profileData', JSON.stringify(userData))


            if(!response.ok){
                const errorMessage = data.errors?.[0]?.message || data.message || 'Register failed'
                    
                message.style.display = 'block'
                message.innerHTML = errorMessage
                return
            }

            message.style.color = '#3bff93ff'
            message.style.display = 'block'
            message.style.webkitTextStroke = '0.5px #000'
            message.innerHTML = 'Registered successfully'

            const loggedInUser:newProfile = {username: username.value, email: email.value}

            localStorage.setItem('currentUser', JSON.stringify(loggedInUser.username))

            setTimeout(() => {
                window.location.href = '../../post/index.html' //change to feed page
            }, 2000);

            return data
        }catch(error: any){
            message.style.display = 'block'
            message.innerHTML = error.message || 'Something went wrong'
        
            console.error('error: ', error)
        }  
    }
})