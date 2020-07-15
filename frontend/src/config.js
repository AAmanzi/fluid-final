export const dev = process.env.NODE_ENV !== "production";

export const apiUrl = dev ? "http://localhost:8009" : ""; // TODO: prod url

export const playersDevMode = dev && false; // TODO: turn off
export const promptsDevMode = dev && true;
