const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate({
  publicRuntimeConfig: {
    site: {
      name: "Республиканский конкурс рекетостроения QazAstroShift!",
      url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://qazastroshift.kz",
      title: "Республиканский конкурс рекетостроения QazAstroShift!",
      description:
        "QazAstroShift is a rocket engineering tournament held in Kazakhstan, where participants showcase their skills in designing and building rockets. Join us for an exhilarating experience",
      socialPreview: "/images/preview.png",
    },
  },
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
});
