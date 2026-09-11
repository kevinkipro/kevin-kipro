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
  updated: new Date("2026-09-12"),

  lede: [
    "Lately, I’ve been using AI coding agents to build software for myself and reading broadly. I’m interested in how people think, communicate, and relate to each other, and in building technology that feels intuitive to use.",
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
