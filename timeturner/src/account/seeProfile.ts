const bannerDisplay = document.getElementById("banner") as HTMLImageElement
const avatarDisplay = document.getElementById("avatar") as HTMLImageElement
const userNameDisplay = document.getElementById('usersName') as HTMLHeadingElement
const bioText = document.getElementById("bioText") as HTMLParagraphElement
const profileCount = document.getElementById('profileInfo') as HTMLDivElement
const postsDisplay = document.getElementById('userPosts') as HTMLDivElement
const secondUserNameDisplay = document.getElementById('userNameProfile') as HTMLHeadingElement

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
    } catch(error){
        console.error(error)
    }
}

getProfile()