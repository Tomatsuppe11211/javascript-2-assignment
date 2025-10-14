const URL = 'https://v2.api.noroff.dev/social/posts'

interface profileToken {accessToken: string}

const getProfile = localStorage.getItem('profileData')

let profile: profileToken | null = null 

if (getProfile){profile = JSON.parse(getProfile)}

const token = profile?.accessToken

console.log(profile)




async function getPosts(){
    console.log('Getting all posts...')

    

    if(!token){
        console.log('There was an error fetching posts')
        return
    }
    

    console.log('token: ', token)

    try{
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(!response.ok){
            console.log('There was an error loading posts: ', response.status)
        }

        const data = await response.json()
        console.log('posts: ', data)
        return data

    } catch(error){
        console.log('error: ', error)
    }
}
getPosts()