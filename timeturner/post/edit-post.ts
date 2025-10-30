const postTitle = document.getElementById('editPostTitle')
const postBody = document.getElementById('editPostBody')
const postImageUrl = document.getElementById('postImageurl')
const postImageAlt = document.getElementById('postImageDescription')
const saveChangesButton = document.getElementById('editPostbutton')


let profileData = sessionStorage.getItem('profileData')

interface profileToken{accessToken: string, name: string}

let profile: profileToken | null = null

if(profileData){profile = JSON.parse(profileData)}

console.log(profile)

const token = profile?.accessToken

const apiKey = sessionStorage.getItem('CurrentKey') || ''

const editId = sessionStorage.getItem('editId')
console.log(editId)

async function getPost(){
    try{
        const response = await fetch(`https://v2.api.noroff.dev/social/posts/${editId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
                'X-Noroff-API-Key': apiKey
            }
        })

        if(!response.ok){
            const errorMessage = response.text()
            console.error(`error: ${errorMessage}`)
            return
        }

        const data = await response.json()
        console.log(data)
    } catch(error){
        console.error(error)
    }
}

getPost()