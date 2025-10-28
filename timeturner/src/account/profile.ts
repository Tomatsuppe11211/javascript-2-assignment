const bannerDisplay = document.getElementById("banner") as HTMLImageElement
const avatarDisplay = document.getElementById("avatar") as HTMLImageElement
const userNameDisplay = document.getElementById('usersName') as HTMLElement
const bioText = document.getElementById("bioText") as HTMLParagraphElement
const profileCount = document.getElementById('profileInfo') as HTMLDivElement
const editprofileButton = document.getElementById("editProfileButton") as HTMLButtonElement
const postsDisplay = document.getElementById('myPosts')


let profileData = localStorage.getItem('profileData')


interface profileToken {accessToken: string, name: string}

let profile: profileToken | null = null

if(profileData){profile = JSON.parse(profileData)}

const token = profile?.accessToken

const apiKey = localStorage.getItem('CurrentKey') || ''



async function getSocialProfile(){
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


        if(profileInfo.banner.url){
            bannerDisplay.src = profileInfo.banner.url
            bannerDisplay.alt = profileInfo.banner.alt
        }

        if(profileInfo.avatar.url){
            avatarDisplay.src = profileInfo.avatar.url
            bannerDisplay.alt = profileInfo.banner.alt
        }

        
        userNameDisplay.innerHTML = profileInfo.name

        if(profileInfo.bio === null || !profileInfo.bio){
            bioText.innerHTML = "This bio is empty"
        } else {
            bioText.innerHTML = profileInfo.bio
        }

        const postsCount = document.createElement('p')
        postsCount.innerHTML = `Posts: ${profileInfo._count.posts}`
        profileCount.appendChild(postsCount)

        const followingCount = document.createElement('p')
        followingCount.innerHTML = `Following: ${profileInfo._count.following}`
        profileCount.appendChild(followingCount)

        const followersCount = document.createElement('p')
        followersCount.innerHTML = `Followers: ${profileInfo._count.followers}`
        profileCount.appendChild(followersCount)


        console.log(data)
        return data

    } catch(error){
        console.error('Error: ', error)
    }
}


editprofileButton.addEventListener('click', function(){
    window.location.href="../../index.html" //change with edit profile page
})



async function getPosts(){
    await getSocialProfile()

    try{
        const response =  await fetch(`https://v2.api.noroff.dev/social/profiles/${profile?.name}/posts`, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
                'X-Noroff-API-Key': apiKey
            }
        })

        if(!response.ok){
            console.log(`someting went wrong!`)
            const errorMessage = await response.text()
            console.log(`Response: ${errorMessage}`)
        }

        const data = await response.json()

        const myPosts = data.data
        console.log(myPosts)
        
        if(data && myPosts.length !== 0){
            console.log(data)

            for(let i = 0; i < myPosts.length; i++){
                console.log(myPosts[i])
                
                const post = document.createElement('div')
                post.className = 'userPosts'

                if(myPosts[i].media !== null){
                    const postImg = document.createElement('img')
                    postImg.className = 'profilePostImage'
                    postImg.src = myPosts[i].media.url
                    post.appendChild(postImg)
                } else {
                    const postImg = document.createElement('div')
                    postImg.className = 'profilePostImage'
                    postImg.style.backgroundColor = '#00aeff'
                    post.appendChild(postImg)
                }
                
                

                

                const postTitle = document.createElement('h2')
                postTitle.innerHTML = myPosts[i].title
                post.appendChild(postTitle)

                const deleteButton = document.createElement('button')
                deleteButton.className = 'deletePostButtons'
                deleteButton.innerHTML = 'Delete'

                deleteButton.addEventListener('click', async function(){
                    await fetch(`https://v2.api.noroff.dev/social/posts/${myPosts[i].id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json', 
                            'X-Noroff-API-Key': apiKey
                        }
                    })

                    alert('Deleted')

                    postsDisplay.innerHTML = ''
                    bioText.innerHTML = ''
                    profileCount.innerHTML = ''

                    getPosts()
                })

                post.appendChild(deleteButton)

                postsDisplay?.appendChild(post)
            }
        } else {
            console.log('no posts found')
        }
        
        
    } catch (error){
        console.error(error)
    }
}

getPosts()

