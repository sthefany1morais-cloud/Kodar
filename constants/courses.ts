import { Course } from "../types";

export const COURSES: Course[] = [
  {
    id: "react-native",
    title: "React Native Completo do Zero ao Avançado",
    thumbnail: "https://img.youtube.com/vi/dF9qG9qXeKw/maxresdefault.jpg",
    playlistId: "PLwDSnj6Dw9_tk6V0mVzmRMCG9tX0L0mR-",
    price: 29.9,
    totalDuration: "12h 45min",
    lessons: [
      {
        id: "rn-1",
        title: "Introdução ao React Native",
        youtubeVideoId: "dF9qG9qXeKw",
        duration: "25:30",
        order: 1,
      },
      {
        id: "rn-2",
        title: "Configuração do ambiente",
        youtubeVideoId: "a8YvzTXft9c",
        duration: "18:45",
        order: 2,
      },
      {
        id: "rn-3",
        title: "Primeiro App - Hello World",
        youtubeVideoId: "UtVbCgHOgw4",
        duration: "22:10",
        order: 3,
      },
    ],
  },
  {
    id: "nodejs",
    title: "Node.js e Express do Zero",
    thumbnail: "https://img.youtube.com/vi/UtVbCgHOgw4/maxresdefault.jpg",
    playlistId: "PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G",
    price: 24.9,
    totalDuration: "8h 30min",
    lessons: [
      {
        id: "node-1",
        title: "O que é Node.js?",
        youtubeVideoId: "hHM-hr9q4mo",
        duration: "15:20",
        order: 1,
      },
      {
        id: "node-2",
        title: "Primeiro servidor com Express",
        youtubeVideoId: "gmupEp468lY",
        duration: "28:40",
        order: 2,
      },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript do Básico ao Avançado",
    thumbnail: "https://img.youtube.com/vi/-vn4kQv2JSs/maxresdefault.jpg",
    playlistId: "PL4cUxeGkcC9gUgr39pYcwS4b7yr4r1x0E",
    price: 19.9,
    totalDuration: "6h 20min",
    lessons: [
      {
        id: "ts-1",
        title: "Introdução ao TypeScript",
        youtubeVideoId: "-vn4kQv2JSs",
        duration: "20:15",
        order: 1,
      },
      {
        id: "ts-2",
        title: "Tipos básicos e interfaces",
        youtubeVideoId: "gAiJ5Y9iO1A",
        duration: "25:50",
        order: 2,
      },
    ],
  },
];
