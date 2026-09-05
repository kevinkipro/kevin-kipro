import type { ImageMetadata } from "astro";

import chipWar from "../assets/books/chip-war.jpg";
import howToKnowAPerson from "../assets/books/how-to-know-a-person.jpg";
import psychologyOfMoney from "../assets/books/psychology-of-money.jpg";
import range from "../assets/books/range.jpg";
import steveJobs from "../assets/books/steve-jobs.jpg";

export interface Book {
  title: string;
  author: string;
  cover: ImageMetadata;
  status: string;
}

export const now = {
  updated: new Date("2026-09-05"),

  lede: [
    "I’ve been building software for myself with Codex and Claude Code, including this website. I’m making the design decisions and using agents to help implement them. I spend quite a while adjusting the details.",
    "Alongside that, I’m doing my software engineering degree apprenticeship. I’d like to write about that experience here.",
    "Outside software, I’m spending time in the gym. I enjoy running too.",
  ],

  books: [
    {
      title: "Chip War",
      author: "Chris Miller",
      cover: chipWar,
      status: "Reading",
    },
    {
      title: "How to Know a Person",
      author: "David Brooks",
      cover: howToKnowAPerson,
      status: "Finished",
    },
    {
      title: "Steve Jobs",
      author: "Walter Isaacson",
      cover: steveJobs,
      status: "Finished",
    },
    {
      title: "Range",
      author: "David Epstein",
      cover: range,
      status: "Finished",
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: psychologyOfMoney,
      status: "Finished",
    },
  ] as Book[],

};
