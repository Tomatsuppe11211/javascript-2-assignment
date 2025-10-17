const URL = 'https://v2.api.noroff.dev/social/posts'





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
            'Content-Type': 'Application/json'
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
        console.log('posts: ', data)
        return data

    } catch(error){
        console.log('error: ', error)
    }
}

getPosts()