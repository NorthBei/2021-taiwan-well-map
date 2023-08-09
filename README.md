# 2021 台灣水井地圖 & 預約取水服務
<img width="1792" alt="image" src="https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/6063a726-c6d1-4da3-8d67-e36d68d42825">

## Project Intro

### Introduction

2021年臺灣旱災缺水危機為發生於2021年初台灣本島西部地區的大規模乾旱事件，導致各地區進入不同程度的減壓供水、限水、停耕、歇業等情況，此為自1947年以來最嚴重乾旱、又被稱作「百年大旱」。
此波旱象於5月底～6月底連續幾波梅雨鋒面、陣雨、西南氣流帶來明顯降雨而緩解，中央旱災應變中心於6月22日解除開設

![image](https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/50f3e383-36fd-4b93-be3a-05ebaeae5aba)

Ref: [維基百科 - 2021年臺灣旱災缺水危機](https://zh.wikipedia.org/zh-tw/2021%E5%B9%B4%E8%87%BA%E7%81%A3%E6%97%B1%E7%81%BD%E7%BC%BA%E6%B0%B4%E5%8D%B1%E6%A9%9F)

這波百年大旱發生時，當時我正在水利署服替代役，因為全台缺水，整個水利署都在為民生和工業調度水資源忙得不可開交。身為一個小小的替代役，業務上能直接協助的事情並不多，我能幫忙比較多忙的部分，就是發揮自己的所學，把水井的Open Data放上Google Map，將資料視覺化，讓資訊檢索更有效率，同時加上了預約取水的介面與功能，希望在旱災時能用自己的一份力量幫助台灣


### Person In charge
- Website Dev by NorthBei from [Metartemis](https://metartemis.co)

### Relative Link
- [2021 Taiwan Well Map](https://2021-taiwan-well-map.netlify.app/)

### Screenshots/Film

| PC |
|-|
|<img width="1779" alt="截圖 2023-08-09 上午5 04 12" src="https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/bc49252a-e0ef-4fe8-abdc-9c663a60e20a">|
|<img width="1778" alt="截圖 2023-08-09 上午5 04 32" src="https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/45f42bbe-37f5-4151-b92e-4a0e70275e73">|
|<img width="1777" alt="截圖 2023-08-09 上午5 04 41" src="https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/6749683b-b06b-4820-b6f5-c9aa49884f69">|

| Mobile | Mobile | Mobile |
|-|-|-|
|![253592](https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/fb5a3f51-e23e-4d8e-a8fe-169db548a8eb)|![253591](https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/7938ad32-ec28-45cb-b2db-f456051024c0)|![253589](https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/95e57e0c-4ddc-4034-b36c-ee61e3d699e2)|
|![253590](https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/af2ca222-1f17-4a40-8602-1197a8a0b411)|![253588](https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/a5044440-b1b7-4217-9144-c9a5a10a2f95)|![253587](https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/d116739a-5a10-4469-af7b-87cc41d45103)|
|![253586](https://github.com/NorthBei/2021-taiwan-well-map/assets/15665709/792fbd3d-9a3f-40a5-a2e3-760350be8fc0)|||

## Development Instruction

### Environment

|Service|Version|
|-|-|
|Node.js|v18.16.0|
|npm| v9.5.1|
|Vue|Vue2|

### Environment Variables

Rename the `.env.local.example` to `.env.local`, and get the env var from Google Map API console

|Service|Env var|
|-|-|
|Google Map|VUE_APP_GOOGLE_MAP_API_KEY|

> Note: The current production google map api key is hosted by 2021newtaipeiculturefestival project

### Getting Started

Install packages & Run the development server:

```zsh
npm install
npm install serve
```

### Project setup

Install all packages
```zsh
yarn install
```

### Start Development

Run development web server at http://localhost:8080 to compile and hot-reloads for development

```zsh
npm run serve
```

### Lint all files

Run lint for all `.vue`, `.js`, `.json` files by eslint

```zsh
npm run lint
```

### Build Production

Compiles and minifies for production

```zsh
npm run build
```

### Preview Built Result

Run local static file server for preview built result at http://localhost:8080

```zsh
npm run preview
```


## Reference
- Design
  - [Gradient rocket background](https://www.freepik.com/free-vector/gradient-rocket-background_4401989.htm#query=gradient-rocket-background)
  - [Well Image](https://www.flaticon.com/free-icon/buildings_842868?term=well&page=1&position=41&page=1&position=41&related_id=842868&origin=search)
- Development
  - 如何解決Node 17(含)以上，執行Vue2會出現ERR_OSSL_EVP_UNSUPPORTED:
    - [how to fix 'ERR_OSSL_EVP_UNSUPPORTED' ERROR in vue?](https://stackoverflow.com/questions/71273466/how-to-fix-err-ossl-evp-unsupported-error-in-vue)
  - Disalbe Vue Cli PWA service
    - [Disable PWA plugin in Vue CLI 3](https://stackoverflow.com/questions/52800904/disable-pwa-plugin-in-vue-cli-3)
    - [Allow users to disable web app manifest injection in PWA plugin #4653](https://github.com/vuejs/vue-cli/issues/4653)
