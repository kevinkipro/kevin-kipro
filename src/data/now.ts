export interface Book {
  title: string;
  author: string;
}

export const now = {
  updated: new Date("2026-09-02"),

  lede: [
    "I’m a computer science student and software engineering degree apprentice in Adelaide. Most of my time right now goes to AI coding agents — building and shipping real things with them, and working out how much they change what one person can build.",
    "The rest goes to reading, and to training six days a week.",
  ],

  reading: { title: "Chip War", author: "Chris Miller" } as Book,

  recentlyRead: [
    { title: "How to Know a Person", author: "David Brooks" },
    { title: "Steve Jobs", author: "Walter Isaacson" },
    { title: "Range", author: "David Epstein" },
    { title: "The Psychology of Money", author: "Morgan Housel" },
  ] as Book[],

  curiousAbout: [
    "western philosophy",
    "how people decide what is true",
    "how scientific and technological progress actually happens",
    "semiconductors and the infrastructure under modern computing",
    "people who build ambitious things",
    "communication and social intelligence",
    "decision-making under uncertainty",
  ],
};
