import '../css/style.css'


const currentUser = sessionStorage.getItem('currentUser')

if(currentUser && window.location.pathname.includes('index')){
  if(!window.location.pathname.includes('post/index')){
    window.location.href= '/post/index.html'
  }
}


if(window.location.pathname.includes('login')){
  import ('../src/account/login.ts')
}


if(window.location.pathname.includes('register')){
  import ('../src/account/register.ts')
}


if(window.location.pathname.includes('/post/index')){
  import ('../post/feed.ts')
  if(!currentUser){window.location.href = '../index.html'}
}

if(window.location.pathname.includes('/profile')){
  import ('../src/account/profile.ts')
  if(!currentUser){window.location.href = '../../index.html'}
}

if(window.location.pathname.includes('create-post')){
  import('../post/create-post.ts')
}


if(window.location.pathname.includes('single-post')){
  import('../post/single-post.ts')
}


if(window.location.pathname.includes('edit-post')){
  import('../post/edit-post.ts')
}


if(window.location.pathname.includes('seeProfile')){
  import('../src/account/seeProfile.ts')
}


if(window.location.pathname.includes('edit-profile')){
  import('../src/account/edit-profile.ts')
}




if(window.location.pathname.includes('privacy-policy')){
  const privacyHeader = document.getElementById('loggedInPrivacyNav') as HTMLHeadingElement

  if(privacyHeader){
    if(!currentUser && currentUser === null){
      privacyHeader.style.display = 'none'
    } else {
      privacyHeader.style.display = 'flex'
    }
  }  
}



if(window.location.pathname.includes('terms-of-use')){
  const tersmHeader = document.getElementById('loggedInTermsNav') as HTMLHeadingElement

  if(tersmHeader){
    if(!currentUser || currentUser === null){
      tersmHeader.style.display = 'none'
    } else {
      tersmHeader.style.display = 'flex'
    }
  } 
}


if(window.location.pathname.includes('contact')){
  const contactHeader = document.getElementById('loggedInContactNav') as HTMLHeadingElement
  
  if(!currentUser || currentUser === null){
      contactHeader.style.display = 'none'
  } else {
      contactHeader.style.display = 'flex'
  }

  const sendButton = document.getElementById('contactButton') as HTMLButtonElement
  sendButton.addEventListener('click', async function(e){
    e.preventDefault()
    alert('Message sent')
    window.location.href = '../index.html'
  })
}







//For the searchbar
const deskSearchButton = document.getElementById('desktopSearchButton') as HTMLElement
const deskSearchInput = document.getElementById('desktopSearchInput') as HTMLInputElement
const mobileSearchButton = document.getElementById('mobileSearchButton') as HTMLElement
const mobileSearchInput = document.getElementById('mobileSearchInput') as HTMLInputElement

if(deskSearchButton){
  deskSearchButton.addEventListener('click', function(){
    if(deskSearchInput.value === "" || null){
      alert(`You can't leave the search input field empty`)
    } else {
      sessionStorage.setItem('userSearch', deskSearchInput.value)
      if(window.location.pathname.includes('post')){
        window.location.href = 'search-results.html'
      } else if(window.location.pathname.includes('account')){
        window.location.href = '../../post/search-results.html'
      }
    }
  })
}

if(mobileSearchButton){
  mobileSearchButton.addEventListener('click', function(){
    if(mobileSearchInput.value === '' || null){
      alert(`You can't leave the search input field empty`)
    } else {
      sessionStorage.setItem('userSearch', mobileSearchInput.value)
      if(window.location.pathname.includes('post')){
        window.location.href = 'search-results.html'
      } else if(window.location.pathname.includes('account')){
        window.location.href = '../../post/search-results.html'
      }
    }
  })
}




if(window.location.pathname.includes('search-results')){
  import('../post/search-results.ts')
}




//for settings.html
if(window.location.pathname.includes('settings')){
  if(!currentUser){window.location.href = '../../index.html'}
  
  const logoutButton = document.getElementById('logoutButton') as HTMLButtonElement

  logoutButton.addEventListener('click', function(){
    alert('you have been logged out')
    sessionStorage.removeItem('currentUser')
    window.location.href = '../../index.html'
  })
}