import authorPhoto from "../assets/author-github.jpg";

export const siteUrl = "https://kevinkipro.com";
export const person = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Kevin Kiprotich",
  alternateName: "kevinkipro",
  url: `${siteUrl}/about/`,
  image: new URL(authorPhoto.src, siteUrl).href,
  jobTitle: "Software Engineering Degree Apprentice",
  description: "Software engineering degree apprentice based in Adelaide, Australia, writing about technology and what I’m learning.",
  homeLocation: {
    "@type": "Place",
    name: "Adelaide, South Australia, Australia",
  },
  sameAs: [
    "https://github.com/kevinkipro",
    "https://www.linkedin.com/in/kevin-kiprotich-18a1b11b4",
  ],
};

export const website = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: `${siteUrl}/`,
  name: "Kevin Kiprotich",
  alternateName: "kevinkipro.com",
  publisher: { "@id": person["@id"] },
  inLanguage: "en-AU",
};
