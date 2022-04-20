let productionURL = "https://yspoof.github.io";
let developmentURL = "http://localhost:8080";

module.exports = {
  siteName: "YSPoof's Test Place",
  description: "Just a test place for Me lol",
  aboutMe: "Not a dev nor designer lol",
  socials: [
    {
      name: "YouTube",
      url: "https://www.youtube.com/c/MrZeroXD",
      icon: "assets/images/icons/socials/youtube.svg",
    },
    {
      name: "X",
      url: "https://twitter.com/YSPoof",
      icon: "assets/images/icons/socials/twitter.svg",
    },
    {
      name: "Discord",
      url: "https://discord.com/users/yspoof",
      icon: "assets/images/icons/socials/discord.svg",
    },
  ],
  projects: [
    {
      name: "Tarefa Educação",
      description: "Null",
      link: "https://tarefaedu.lzart.com.br",
    },
    {
      name: "Receitinhas",
      description: "Null",
      link: "https://receitinhas.lzart.com.br",
    },
    {
      name: "LZArt",
      description: "Null",
      link: "https://lzart.com.br",
    },
  ],
  url: process.env.ELEVENTY == "production" ? productionURL : developmentURL,
  env: process.env.ELEVENTY || "development",
};
