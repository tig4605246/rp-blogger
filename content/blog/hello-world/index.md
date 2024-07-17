---
title: 從0開始建立並發布Blog
date: "2024-07-14T15:24:46Z"
description: "用 Gatsby 與 Github pages 來從0打造一個部落格"
---

![Robot creating website](./robot_laptop.png)

要在 GitHub 上托管 Gatsby 部落格，可以使用 GitHub Pages。以下是一步一步教學：

1. 在 GitHub 上建立一個 repo 給 Gatsby Blog。

2. 用模板建立一個 Gatsby repo：

```sh
npx gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

3. 將 GitHub repo 連結到 local git repo：

```sh
cd gatsby-starter-blog
git init 
git remote add origin https://github.com/your-username/your-repo.git
```

4. 設定 Gatsby 以 `gh-pages` 分支進行部署。安裝 `gh-pages` 來做這件事：

```sh
npm install gh-pages --save-dev
```

5. 將 `deploy` 腳本添加到您的 `package.json` 文件中：

```json
{
   "scripts": {
      "deploy": "gatsby build --prefix-paths && gh-pages -d public -b gh-pages"
   }
}
```

6. 配置您的 `gatsby-config.js` 以使用正確的 `pathPrefix` 用於 GitHub Pages。將以下行添加到您的 `gatsby-config.js` 中：

```js
module.exports = {
   pathPrefix: "/your-repo",
   // ... 其他配置
}
```

   將 `/your-repo` 替換為您的 GitHub 倉庫名稱。

7. 提交您的更改並推送到 GitHub 倉庫：

```=sh
git add .
git commit -m "Initial commit"
git push -u origin main
```

8. 通過運行 `deploy` 腳本將您的 Gatsby 站點部署到 GitHub Pages：

```=sh
npm run deploy
```

此命令將構建您的 Gatsby 站點並將生成的文件推送到您的 GitHub 倉庫的 `gh-pages` 分支。

9. 前往您的 GitHub 倉庫設置，導航到“Pages”部分，並配置源使用 `gh-pages` 分支。

10. 您的 Gatsby 博客現在應該可以通過 `https://your-username.github.io/your-repo` 訪問。

注意：確保將 `your-username` 和 `your-repo` 替換為您實際的 GitHub 用戶名和倉庫名稱。

就這樣！您的 Gatsby 博客現在應該托管在 GitHub Pages 上。每當您想更新博客時，只需提交更改並運行 `npm run deploy` 命令重新部署您的站點。
