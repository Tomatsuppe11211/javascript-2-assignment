let profileData = JSON.parse(localStorage.getItem('profileData'))
console.log(profileData)

const accessToken = localStorage.getItem('accessToken')
console.log(accessToken)


async function getSocialProfile(){
    console.log('fetching profile for: ', profileData.name)
    
    try{
        const response = await fetch('https://v2.api.noroff.dev/social/profiles/' + profileData.name, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            console.log('There was an error fetching the profile')
            return
        }

        const data = await response.json()
        console.log(data)
        return data

    } catch(error){
        console.error('Error: ', error)
    }
}


getSocialProfile()















const userNameDisplay = document.getElementById('usersName') as HTMLElement
userNameDisplay.innerHTML = profileData.name

const bioText = document.getElementById("bioText") as HTMLElement
if(profileData.bio === null || !profileData.bio){
    bioText.innerHTML = "This bio is empty"
} else {
    bioText.innerHTML = profileData.bio
}


const updateProfileButton = document.getElementById("changeBioButton") as HTMLButtonElement
updateProfileButton.addEventListener('click', editBio)

function editBio(){
    bioText.innerHTML = "<textarea id='bioInput'></textarea>"

    updateProfileButton.removeEventListener('click', editBio)
}





