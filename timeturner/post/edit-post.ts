const postTitle = document.getElementById('editPostTitle') as HTMLInputElement
const postBody = document.getElementById('editPostBody') as HTMLInputElement
const postImageUrl = document.getElementById('postImageUrl') as HTMLInputElement
const postImageAlt = document.getElementById('postImageDescription') as HTMLInputElement
const saveChangesButton = document.getElementById('editPostButton') as HTMLInputElement


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
        const oldContent = data.data
        console.log(data)

        postTitle.value = oldContent.title

        if(oldContent.body && oldContent.body !== null){
            postBody.value = oldContent.body
        }

        if(oldContent.media.url && oldContent.media.url !== null){
            postImageUrl.value = oldContent.media.url
        }

        if(oldContent.media.alt && oldContent.media.alt !== null){
            postImageAlt.value = oldContent.media.alt
        }
        

    } catch(error){
        console.error(error)
    }
}
getPost()





saveChangesButton.addEventListener('click', async function(e){
    e.preventDefault()
    
    if(!postTitle){alert('Title is required')}


    const newPostData: any = {
        title: postTitle.value,
        body: postBody.value || undefined,
        tags: []
    }

    if(postImageUrl){
        newPostData.media = {
            url: postImageUrl.value,
            alt: postImageAlt.value || ''
        }
    }


    const response = await fetch(`https://v2.api.noroff.dev/social/posts/${editId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
            'X-Noroff-API-Key': apiKey
        },
        body: JSON.stringify(newPostData)
    })
    
    if(!response.ok){
        const errorMessage = response.text()
        console.log(errorMessage)
        return
    }

    alert('Saved changes!')

    window.location.href = '/index.html'
})