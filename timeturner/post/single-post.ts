const postDisplay = document.getElementById('aPost')

const id = sessionStorage.getItem('postId')
console.log(id)

const profileData = localStorage.getItem('profileData')

interface profileToken{accessToken: string, name: string}

let profile: profileToken | null = null

if(profileData){profile = JSON.parse(profileData)}

console.log(profile)

const token = profile?.accessToken

const API_KEY = localStorage.getItem('currentKey') || ''


async function getPost(){
    try{
        const response = await fetch(`https://v2.api.noroff.dev/social/posts/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
                'X-Noroff-API-Key': API_KEY
            }
        })

        if(!response.ok){
            const errorMessage = response.text()
            console.log(`There was an error loading the post: ${errorMessage}`)
        }
    } catch(error){
        console.error(error)
    }
}