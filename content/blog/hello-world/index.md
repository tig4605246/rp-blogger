---
title: 從0開始建立並發布Blog
date: "2024-07-14T15:24:46Z"
description: "Build and host a blog on Github pages"
---

![Robot creating website](./robot_laptop.png)

To host your Gatsby blog on GitHub, you can use GitHub Pages. Here's a step-by-step guide:

1. Create a new repository on GitHub for your Gatsby blog.

2. Initialize a new Git repository in your Gatsby project directory:
   ```
   git init
   ```

3. Add the GitHub repository as a remote:
   ```
   git remote add origin https://github.com/your-username/your-repo.git
   ```

4. Configure your Gatsby site to use the `gh-pages` branch for deployment. Install the `gh-pages` package as a development dependency:
   ```
   npm install gh-pages --save-dev
   ```

5. Add a `deploy` script to your `package.json` file:
   ```json
   {
     "scripts": {
       "deploy": "gatsby build && gh-pages -d public -b gh-pages"
     }
   }
   ```

6. Configure your `gatsby-config.js` to use the correct `pathPrefix` for GitHub Pages. Add the following line to your `gatsby-config.js`:
   ```js
   module.exports = {
     pathPrefix: "/your-repo",
     // ... rest of your config
   }
   ```
   Replace `/your-repo` with the name of your GitHub repository.

7. Commit your changes and push to the GitHub repository:
   ```
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

8. Deploy your Gatsby site to GitHub Pages by running the `deploy` script:
   ```
   npm run deploy
   ```
   This command will build your Gatsby site and push the generated files to the `gh-pages` branch of your GitHub repository.

9. Go to your GitHub repository settings, navigate to the "Pages" section, and configure the source to use the `gh-pages` branch.

10. Your Gatsby blog should now be accessible at `https://your-username.github.io/your-repo`.

Note: Make sure to replace `your-username` and `your-repo` with your actual GitHub username and repository name.

That's it! Your Gatsby blog should now be hosted on GitHub Pages. Whenever you want to update your blog, simply commit your changes and run the `npm run deploy` command to redeploy your site.
