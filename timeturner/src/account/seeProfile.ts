const bannerDisplay = document.getElementById("banner") as HTMLImageElement
const avatarDisplay = document.getElementById("avatar") as HTMLImageElement
const userNameDisplay = document.getElementById('usersName') as HTMLHeadingElement
const bioText = document.getElementById("bioText") as HTMLParagraphElement
const profileCount = document.getElementById('profileInfo') as HTMLDivElement
const secondUserNameDisplay = document.getElementById('userNameProfile') as HTMLHeadingElement
const postsDisplay = document.getElementById('userPosts') as HTMLDivElement


const seeUserProfile = sessionStorage.getItem('seeProfile')
let profileData = sessionStorage.getItem('profileData')


interface profileToken {accessToken: string, name: string}

let profile: profileToken | null = null

if(profileData){profile = JSON.parse(profileData)}
console.log(profile)

const token = profile?.accessToken

const apiKey = sessionStorage.getItem('CurrentKey') || ''



async function getProfile(){
    try{
        const response = await fetch(`https://v2.api.noroff.dev/social/profiles/${seeUserProfile}`, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
                'X-Noroff-API-Key': apiKey
            }
        })

        if(!response.ok){
            const errorMessage = response.text()
            console.log(errorMessage)
            return
        }

        const data = await response.json()
        const userInfo = data.data
        console.log(userInfo)


        bannerDisplay.src = userInfo.banner.url
        bannerDisplay.alt = userInfo.banner.alt

        avatarDisplay.src = userInfo.avatar.url
        avatarDisplay.alt = userInfo.avatar.alt

        userNameDisplay.innerHTML = userInfo.name

        if(!userInfo.body || userInfo.body === null){
            bioText.innerHTML = `${userInfo.name}'s bio is empty`
        } else {
            bioText.innerHTML = userInfo.body
        }
        

        const postCount = document.createElement('p')
        postCount.innerHTML = `Posts: ${userInfo._count.posts}`
        profileCount.appendChild(postCount)

        const followersCount = document.createElement('p')
        followersCount.innerHTML = `Followers: ${userInfo._count.followers}`
        profileCount.appendChild(followersCount)

        const followingCount = document.createElement('p')
        followingCount.innerHTML = `Following: ${userInfo._count.following}`
        profileCount.appendChild(followingCount)

        secondUserNameDisplay.innerHTML = `${userInfo.name}'s posts`

        async function getUserPosts(){
            try{
                const response = await fetch(`https://v2.api.noroff.dev/social/profiles/${seeUserProfile}/posts`, {
                    method: 'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', 
                        'X-Noroff-API-Key': apiKey
                    }
                })

                if(!response.ok){
                    const errorMessage = await response.text()
                    console.log(errorMessage);
                    return
                }

                const data = await response.json()
                const posts = data.data
                console.log(posts)

                for(let i = 0; i < posts.length; i++){
                    const postDiv = document.createElement('div')
                    postDiv.className = 'userPosts'

                    if(posts[i].media !== null){
                        const postImage = document.createElement('img')
                        postImage.className = 'profilePostImage'
                        postImage.src = posts[i].media.url
                        postImage.alt = posts[i].media.alt
                        postDiv.appendChild(postImage)                        
                    } else {
                        const postImage = document.createElement('div')
                        postImage.className = 'profilePostImage'
                        postImage.style.backgroundColor = '#00aeff'
                        postDiv.appendChild(postImage)
                    }

                    const postTitle = document.createElement('h2')
                    postTitle.innerHTML  = posts[i].title
                    postDiv.appendChild(postTitle)

                    postDiv.addEventListener('click', function(){
                        sessionStorage.setItem('postId', posts[i].id)
                        window.location.href = '../../post/single-post.html'
                    })

                    postsDisplay.appendChild(postDiv)
                }
            } catch(error){
                console.log(`failed to retireve ${userInfo.name}'s posts`)
                console.error(error)
                return
            }
        }

        getUserPosts()
    } catch(error){
        console.log('failed to retrieve user profile')
        console.error(error)
        return
    }
}

getProfile()