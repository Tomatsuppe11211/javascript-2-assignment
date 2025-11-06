const currentUser = sessionStorage.getItem('currentUser')
if(!currentUser){window.location.href="../../index.html"}

const newBanner = document.getElementById('changeBanner') as HTMLInputElement
const newAvatar = document.getElementById('changeAvatar') as HTMLInputElement
const newBio = document.getElementById('changeBio') as HTMLTextAreaElement
const updateButton = document.getElementById('updateButton') as HTMLButtonElement

let profileData = sessionStorage.getItem('profileData')


interface profileToken {accessToken: string, name: string}

let profile: profileToken | null = null

if(profileData){profile = JSON.parse(profileData)}

const token = profile?.accessToken

const apiKey = sessionStorage.getItem('CurrentKey') || ''




const retrieveProfileInfo = async function(){
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
            const errorMessage = await response.text()
            console.log(errorMessage)
            return
        }

        const data = await response.json()
        const userprofile = data.data

        if(userprofile.banner.url !== '' || null){
            newBanner.value = userprofile.banner.url
        }

        if(userprofile.avatar.url !== '' || null){
            newAvatar.value = userprofile.avatar.url
        }

        if(userprofile.bio !== '' || null){
            newBio.value = userprofile.bio
        }

        updateButton?.addEventListener('click', async function(e){
            e.preventDefault()
    
            const updateData: any = {
                bio: newBio.value,
                banner: {
                    alt: 'Banner'
                },
                avatar: {
                    alt: 'Avatar'
                }
            }

            if(newBanner.value !== 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500'){
                updateData.banner = {
                    url: newBanner.value
                }
            }

            if(newAvatar.value !== 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500'){
                updateData.avatar = {
                    url: newAvatar.value
                }
            }


            const response = await fetch(`https://v2.api.noroff.dev/social/profiles/${profile?.name}`,  {
                method: 'PUT',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                    'X-Noroff-API-Key': apiKey
                }, 
                body: JSON.stringify(updateData)
            })

            if(!response.ok){
                const errorMessage = await response.text()
                console.log(errorMessage)
                return
            }

            alert('Profile updated')

            window.location.href="profile.html"
        })

    } catch(error){
        console.error(error)
    }
}

retrieveProfileInfo()





