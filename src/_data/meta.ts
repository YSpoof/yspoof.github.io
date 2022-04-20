function getDevIp(): string | undefined {
  // Try/catch for https://github.com/denoland/deno/issues/25420
  try {
    for (const info of Deno.networkInterfaces()) {
      if (info.family !== "IPv4" || info.address.startsWith("127.")) {
        continue;
      }
      return info.address;
    }
  } catch {
    return undefined;
  }
}

const devIp = getDevIp();

const productionURL = "https://yspoof.github.io";
const developmentURL = `http://${devIp}:3000`;

export default {
  siteName: "YSPoof's Test Place",
  description: "Just a test place for Me lol",
  aboutMe: "Not a dev nor designer lol",
  navMenu: [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Implementation",
    url: "/implementation/",
  },
  {
    name: "Whoami",
    url: "/whoami/",
  },
  {
    name: "Tests",
    url: "/tests/",
  }
  ],
  socials: [
    {
      name: "YouTube",
      url: "https://www.youtube.com/c/MrZeroXD",
      icon: "assets/images/icons/socials/youtube.svg",
    },
    {
      name: "X",
      url: "https://x.com/YSPoof",
      icon: "assets/images/icons/socials/twitter.svg",
    },
    {
      name: "Discord",
      url: "https://discord.com/users/yspoof",
      icon: "assets/images/icons/socials/discord.svg",
    },
  ],
  url: Deno.env.get("BUILD") == "production" ? productionURL : developmentURL,
  env: Deno.env.get("BUILD") || "development",
};
