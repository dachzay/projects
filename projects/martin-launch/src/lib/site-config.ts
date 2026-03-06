const defaults = {
  martinUrl: "https://chat.zoominfo.co/300/agents/8238",
  title: "Launch Martin",
  tagline: "Martin keeps the thread when the work gets noisy.",
} as const;

function readConfig(name: string, fallback: string) {
  const value = process.env[name]?.trim();

  return value && value.length > 0 ? value : fallback;
}

export const siteConfig = {
  martinUrl: readConfig("MARTIN_URL", defaults.martinUrl),
  title: readConfig("SITE_TITLE", defaults.title),
  tagline: readConfig("SITE_TAGLINE", defaults.tagline),
};
