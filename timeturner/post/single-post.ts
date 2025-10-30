const postDisplay = document.getElementById('aPost')
const tabName = document.getElementById('tabName')

const id = sessionStorage.getItem('postId')

const profileData = localStorage.getItem('profileData')

interface profileToken{accessToken: string, name: string}

let profile: profileToken | null = null

if(profileData){profile = JSON.parse(profileData)}

const token = profile?.accessToken

const API_KEY = sessionStorage.getItem('CurrentKey') || ''



async function getPost(){
    try{
        const response = await fetch(`https://v2.api.noroff.dev/social/posts/${id}?_author=true`, {
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
            return
        }


        const data = await response.json()
        const postDetails = data.data

        if(tabName && tabName !== null){
            tabName.innerHTML = `Timeturner.com/${postDetails.title}`
        }
         

        if(postDetails.media !== null && postDetails.media.url !== null){
            const postImage = document.createElement('img')
            postImage.src = postDetails.media.url
            postDisplay?.appendChild(postImage)
        }


        const postTitle = document.createElement('h1')
        postTitle.innerHTML = postDetails.title
        postDisplay?.appendChild(postTitle)

        if(postDetails.updated !== postDetails.created){
            const showUpdateDate = document.createElement('p')
            showUpdateDate.innerHTML = `Updated: ${postDetails.updated}`
            postDisplay?.appendChild(showUpdateDate)
        }


        const postBody = document.createElement('p')
        postBody.innerHTML = postDetails.body
        postDisplay?.appendChild(postBody)

        const showCreatedDate = document.createElement('p')
        showCreatedDate.innerHTML = `Created ${postDetails.created} by ${postDetails.author.name}`
        postDisplay?.appendChild(showCreatedDate)

        const interactions = document.createElement('div')
        interactions.id = 'interactions'

        const reacts = document.createElement('p')
        reacts.innerHTML = `<i class="fa-solid fa-thumbs-up" id="like"></i>: ${postDetails._count.reactions}`
        interactions.appendChild(reacts)

        const comments = document.createElement('p')
        comments.innerHTML = `<i class="fa-solid fa-comment" id="comment"></i>: ${postDetails._count.comments}`
        interactions.appendChild(comments)

        postDisplay?.appendChild(interactions)
    } catch(error){
        console.error(error)
    }
}

getPost()