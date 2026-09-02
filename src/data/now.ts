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
    "Software engineering student and degree apprentice in Adelaide.",
    "Most of my time goes into agentic engineering. Building real software with coding agents, and finding out how far one person can get with them.",
    "One day I want to start a company. Something people love using.",
  ],

  aside: "I read most days, train at the gym, and run.",

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
    "founders, and how companies actually get built",
    "how good software gets made now that agents write most of it",
    "understanding people, and getting better at it",
    "changing your mind when the facts change",
    "chips, and the machinery under modern computing",
    "training, running, and how the body works",
  ],
};
