import '../css/style.css'

const currentUser = sessionStorage.getItem('currentUser')
if(currentUser && currentUser !== null){
  console.log(currentUser)
}




if(currentUser && window.location.pathname.includes('/index.html')){
  if(!window.location.pathname.includes('post/index.html')){
    window.location.href= '/post/index.html'
  }
}


if(window.location.pathname.includes('login.html')){
  import ('../src/account/login.ts')
}


if(window.location.pathname.includes('register.html')){
  import ('../src/account/register.ts')
}


if(window.location.pathname.includes('/post/index.html')){
  import ('../post/feed.ts')
  if(!currentUser){window.location.href = '../index.html'}
}

if(window.location.pathname.includes('/account/profile.html')){
  import ('../src/account/profile.ts')
  if(!currentUser){window.location.href = '../../index.html'}
}

if(window.location.pathname.includes('create-post.html')){
  import('../post/create-post.ts')
}


if(window.location.pathname.includes('single-post.html')){
  import('../post/single-post.ts')
}


if(window.location.pathname.includes('/edit-post.html')){
  import('../post/edit-post.ts')
}


if(window.location.pathname.includes('seeProfile.html')){
  import('../src/account/seeProfile.ts')
}
















//removing standard coding:

/*
import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
*/