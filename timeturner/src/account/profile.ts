const avatarDisplay = document.getElementById("avatar") as HTMLImageElement
const userNameDisplay = document.getElementById('usersName') as HTMLElement
const bioText = document.getElementById("bioText") as HTMLParagraphElement
const updateProfileButton = document.getElementById("changeBioButton") as HTMLButtonElement


let profileData = localStorage.getItem('profileData')


interface profileToken {accessToken: string, name: string}

let profile: profileToken | null = null

if(profileData){profile = JSON.parse(profileData)}

const token = profile?.accessToken





async function getSocialProfile(){
    const apiKey = localStorage.getItem('CurrentKey')

    try{
        if(!apiKey){throw new Error('API-key missing!')}
        
        const response = await fetch(`https://v2.api.noroff.dev/social/profiles/${profile?.name}`,  {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
                'X-Noroff-API-Key': apiKey
            }
        })

        if(!response.ok){
            console.log('There was an error fetching the profile')
            const errorText = await response.text()
            console.log(`response: ${errorText}`)
            return
        }

        const data = await response.json()

        const profileInfo = data.data

        console.log(profileInfo)


        if(profileInfo.avatar.url){
            avatarDisplay.src = profileInfo.avatar.url
        }

        
        userNameDisplay.innerHTML = profileInfo.name

        if(profileInfo.bio === null || !profileInfo.bio){
            bioText.innerHTML = "This bio is empty"
        } else {
            bioText.innerHTML = profileInfo.bio
        }


        updateProfileButton.addEventListener('click', editBio)
        //Look at this function when editing profile.
        function editBio(){
            if(!profileInfo.bio || profileInfo.bio === null){
                bioText.innerHTML = '<textarea id="bioInput"></textarea>'
            } else {
                bioText.innerHTML = `<textarea id="bioInput" value="${profileInfo.bio}"></textarea>`
            }
    
            

            updateProfileButton.removeEventListener('click', editBio)
            updateProfileButton.addEventListener('click', readBio)

            function readBio(){
                const newBio = document.getElementById("bioInput") as HTMLInputElement
                bioText.innerHTML = `<p id="bioText">${newBio.value}</p>`
                updateProfileButton.removeEventListener('click', readBio)
                updateProfileButton.addEventListener('click', editBio)
            }
        }





        console.log(data)
        return data

    } catch(error){
        console.error('Error: ', error)
    }
}
getSocialProfile()








