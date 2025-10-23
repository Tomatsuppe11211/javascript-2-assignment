const URL = 'https://v2.api.noroff.dev/social/posts'

const showPosts = document.getElementById('showAllPosts')

interface profileToken {accessToken: string}

const getProfile = localStorage.getItem('profileData')

//returning to landing page if no user is logged in
if(!getProfile){window.location.href = '../index.html'}

let profile: profileToken | null = null 

if (getProfile){profile = JSON.parse(getProfile)}

const token = profile?.accessToken

console.log(profile)




//Creating an api-key
async function createApiKey(){
    const response = await fetch('https://v2.api.noroff.dev/auth/create-api-key', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: `current apiKey`})
    })

    const data = await response.json()
    const currentKey = data.data.key
    localStorage.setItem('CurrentKey', currentKey)
    return data.data.key
}

createApiKey()
















async function getPosts(){
    const apiKey = await createApiKey()
    localStorage.getItem('currentKey')

    if(!token){
        console.log('There was an error fetching posts')
        return
    }

    try{
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-Noroff-API-Key': apiKey
            }
        })

        if(!response.ok){
            console.log('There was an error loading posts: ', response.status)
        }

        const data = await response.json()
        const posts = data.data
        console.log(posts.length + ' posts found')

        for(let i = 0; i < posts.length; i++){
            const postDiv = document.createElement('div')
            postDiv.className = 'postDiv'


            if(posts[i].media){
                const postImage = document.createElement('img')
                postImage.className = 'postImage'
                postImage.src = posts[i].media.url
                postDiv.appendChild(postImage) 
            }
            
            const postTitle = document.createElement('h1')
            postTitle.className = 'postTitle'
            postTitle.innerHTML = posts[i].title
            postDiv.appendChild(postTitle)

            const postContent = document.createElement('p')
            postContent.className = 'postContent'
            postContent.innerHTML = posts[i].body
            postDiv.appendChild(postContent)

            const extraInfo = document.createElement('section')
            extraInfo.className = 'extraInfo'
            postDiv.appendChild(extraInfo)

            const reactions = document.createElement('p')
            reactions.className = 'reactions'
            reactions.innerHTML = 'Reactions: ' + posts[i]._count.reactions
            extraInfo.appendChild(reactions)

            const comments = document.createElement('p')
            comments.className = 'comments'
            comments.innerHTML = 'Comments: ' + posts[i]._count.comments
            extraInfo.appendChild(comments)

            showPosts?.appendChild(postDiv)

            showPosts?.addEventListener('click', function(){
                window.location.href = 'https://www.google.com/' //change to postView page
            }) 
        }
        return data

    } catch(error){
        console.log('error: ', error)
    }
}

getPosts()