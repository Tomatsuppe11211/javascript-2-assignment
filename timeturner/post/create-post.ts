const postTitle = document.getElementById('createPostTitle') as HTMLInputElement
const postBody = document.getElementById('createPostBody') as HTMLTextAreaElement
const postImageUrl = document.getElementById('postImageUrl') as HTMLInputElement
const postImageAlt = document.getElementById('postImageDescription') as HTMLInputElement
const createPostButton = document.getElementById('createPostButton') as HTMLButtonElement


const profileData = localStorage.getItem('profileData')

interface profileToken{accessToken: string, name: string}

let profile: profileToken | null = null

if (profileData){profile = JSON.parse(profileData)}

const token = profile?.accessToken

console.log(profile)

const API_KEY = sessionStorage.getItem('CurrentKey') || ''
console.log(API_KEY)


createPostButton.addEventListener('click', async function(e){
    e.preventDefault()

    //fetching values
    const title = postTitle.value
    let body = postBody.value
    let imageURL = postImageUrl.value
    let imageAlt = postImageAlt.value


    console.log(`Title: ${title}`)
    console.log(`body: ${body}`)
    console.log(`image url: ${imageURL}`)
    console.log(`Image alt: ${imageAlt}`)

    if(!title){alert('Title is required')}

    const postData: any = {
        title,
        body: body || undefined,
        tags: []
    }

    if(imageURL){
        postData.media = {
            url: imageURL,
            alt: imageAlt || ''
        }
    }

    try{
        const response = await fetch('https://v2.api.noroff.dev/social/posts', {
            method: 'POST',
            
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY
            }, 
            
            body: JSON.stringify(postData)
        })

        if(!response.ok){
            console.log('Something went wrong! with creating this post:')
            const errormessage = await response.text()
            console.log(`error: ${errormessage}`)
            return
        }

        alert('Post created!')

        window.location.href = '/index.html'
    } catch(error){
        console.error(error)
    }
    
})