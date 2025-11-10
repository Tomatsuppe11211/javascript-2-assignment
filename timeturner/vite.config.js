import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/account/login.html'),
        register: resolve(__dirname, 'src/account/register.html'),
        contact: resolve(__dirname, 'src/account/contact.html'),
        editProfile: resolve(__dirname, 'src/account/edit-profile.html'),
        privacyPolicy: resolve(__dirname, 'src/account/privacy-policy.html'),
        profile: resolve(__dirname, 'src/account/profile.html'),
        seeProfile: resolve(__dirname, 'src/account/seeProfile.html'),
        settings: resolve(__dirname, 'src/account/settings.html'),
        termsOfUse: resolve(__dirname, 'src/account/terms-of-use.html'),
        post: resolve(__dirname, 'post/index.html'),
        singlePost: resolve(__dirname, 'post/single-post.html'),
        searchResults: resolve(__dirname, 'post/search-results.html'),
        editPost: resolve(__dirname, 'post/edit-post.html'),
        createPost: resolve(__dirname, 'post/create-post.html')
      },
    },
  },
})