import '../css/style.css'

const currentUser = localStorage.getItem('currentUser')
if(currentUser){console.log(currentUser)} 


if(window.location.pathname.includes('login.html')){
  import ('../src/account/login.ts')
}


if(window.location.pathname.includes('register.html')){
  import ('../src/account/register.ts')
}


if(window.location.pathname.includes('/post/index.html')){
  import ('../post/feed.ts')
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