const currentUser = sessionStorage.getItem('currentUser')
if(!currentUser){window.location.href="../index.html"}

const resultsDisplay = document.getElementById('resultsDisplay') as HTMLElement

interface profileToken {accessToken: string}

const getProfile = sessionStorage.getItem('profileData')

//returning to landing page if no user is logged in
if(!getProfile){window.location.href = '../index.html'}

let profile: profileToken | null = null 

if (getProfile){profile = JSON.parse(getProfile)}

const token = profile?.accessToken

const API_KEY = sessionStorage.getItem('CurrentKey') || ''

const userSearch = sessionStorage.getItem('userSearch') || ''


const showProfiles = document.createElement('div')
showProfiles.className = 'showResults'

const showPosts = document.createElement('div')
showPosts.className = 'showResults'







async function searchProfiles() {
    const profileTitle = document.createElement('h1')
    profileTitle.className = 'searchTitle'
    profileTitle.innerHTML = 'Profiles'
    showProfiles.appendChild(profileTitle)

    try{
        const response = await fetch(`https://v2.api.noroff.dev/social/profiles/search?q=${(userSearch || '')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-Noroff-API-Key': API_KEY
            }
        })

        if(!response.ok){
            const errorMessage = await response.text()
            console.log(errorMessage)
            return
        }

        const data = await response.json()
        const profiles = data.data

        const allProfilesDisplay = document.createElement('div')
        allProfilesDisplay.className = 'resultsShowcase'
        showProfiles.appendChild(allProfilesDisplay)

        if(profiles.length > 0){
            for(let i = 0; i < profiles.length; i++){
                const profileDiv = document.createElement('div')
                profileDiv.className = 'resultProfileAndPost'

                if(profiles[i]?.avatar?.url && profiles[i]?.avatar?.url !== null){
                    profileDiv.style.backgroundImage = `url(${profiles[i].avatar.url})`
                } else {
                    profileDiv.style.backgroundColor = '#00aeff'
                }

                const profileName = document.createElement('h2')
                profileName.innerHTML = profiles[i].name
                profileDiv.appendChild(profileName)

                allProfilesDisplay.appendChild(profileDiv)

                profileDiv.addEventListener('click', function(){
                    sessionStorage.setItem('seeProfile', profiles[i].name)
                    window.location.href = '../src/account/seeProfile.html'
                })
            }
            resultsDisplay.appendChild(showProfiles)
        }
    } catch(error){
        console.error(error)
    }
}







async function searchPosts(){
    await searchProfiles()
    
    const postTitle = document.createElement('h1')
    postTitle.className = 'searchTitle'
    postTitle.innerHTML = 'Posts'
    showPosts.appendChild(postTitle)

    try{
        const response = await fetch(`https://v2.api.noroff.dev/social/posts/search?q=${(userSearch || '')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-Noroff-API-Key': API_KEY
            }
        })

        if(!response.ok){
            const errorMessage = await response.text()
            console.log(errorMessage)
            return
        }

        const data = await response.json()
        const posts = data.data

        const allPostsDisplay = document.createElement('div')
        allPostsDisplay.className = 'resultsShowcase'
        showPosts.appendChild(allPostsDisplay)


        if(posts.length > 0){
            for(let i = 0; i < posts.length; i++){
                const postDiv = document.createElement('div')
                postDiv.className = 'resultProfileAndPost'

                if(posts[i]?.media?.url && posts[i]?.media?.url !== null){
                    postDiv.style.backgroundImage = `url(${posts[i].media.url})`
                } else {
                    postDiv.style.backgroundColor = '#00aeff'
                }

                const resultTitle = document.createElement('h2')
                resultTitle.innerHTML = posts[i].title
                postDiv.appendChild(resultTitle)

                allPostsDisplay.appendChild(postDiv)

                postDiv.addEventListener('click', function(){
                    sessionStorage.setItem('postId', posts[i].id)
                    window.location.href = 'single-post.html'
                })
            }
            resultsDisplay.appendChild(showPosts)
        }
    } catch(error){
        console.error(error)
    }
}
searchPosts()