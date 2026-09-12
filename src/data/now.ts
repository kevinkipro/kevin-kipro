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
  binding?: {
    color: string;
    ink: string;
    /** Visual spine depth as a proportion of the displayed cover height. */
    thickness: number;
  };
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
      binding: { color: "#eeeade", ink: "#9b7f30", thickness: 0.086 },
    },
    {
      title: "How to Know a Person",
      author: "David Brooks",
      cover: howToKnowAPerson,
      status: "Finished",
      binding: { color: "#af312e", ink: "#fff8e9", thickness: 0.075 },
    },
    {
      title: "Steve Jobs",
      author: "Walter Isaacson",
      cover: steveJobs,
      status: "Finished",
      binding: { color: "#e8e7e2", ink: "#252522", thickness: 0.095 },
    },
    {
      title: "Range",
      author: "David Epstein",
      cover: range,
      status: "Finished",
      binding: { color: "#8fd6bd", ink: "#143b30", thickness: 0.074 },
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: psychologyOfMoney,
      status: "Finished",
      binding: { color: "#edeee7", ink: "#536957", thickness: 0.065 },
    },
  ] as Book[],

};
