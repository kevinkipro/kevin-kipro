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
  updated: new Date("2026-09-02"),

  lede: [
    "Lately I’ve been spending a lot of time on agentic coding, using tools like Codex and Claude Code to build software for myself. It’s how I’m learning at the moment, and I’m curious to see where it goes.",
    "I want to make good software, and one day build something of my own. A company, or a product I really care about that’s genuinely useful to people.",
    "Outside software, health is a big part of my life. Mostly the gym at the moment, and I love running too. I like the process as much as the results.",
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

  interestedIn: [
    "Good software and how it gets made",
    "Agentic coding and what it changes",
    "Founders and great products",
    "People and judgement",
    "Chips and modern computing",
    "Training, running, health, and performance",
  ],

};
