console.log('register.ts loaded...')

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
        console.log('At least one input field is empty!')
    } else {
        if(password.value === confirmedPassword.value){
            console.log('Registration complete!')

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

                if(!response.ok){
                    throw new Error('Register failed')
                }

                const data = await response.json()
                console.log('data: ', data)

                message.style.color = '#3bff93ff'
                message.style.display = 'block'
                message.style.webkitTextStroke = '0.5px #000'
                message.innerHTML = 'Registered successfully'

                const currentUser:newProfile = {username: username.value, email: email.value}

                localStorage.setItem('currentUser', JSON.stringify(currentUser))
                setTimeout(() => {
                    window.location.href = '../login.html' //change to feed page
                }, 2000);

                return data
            }catch(error){
                message.style.display = 'block'
                message.innerHTML = `${error}`
        
                console.error('error: ', error)
            }
        } else {
            console.log('Passwords do not match')
        }
    }
})