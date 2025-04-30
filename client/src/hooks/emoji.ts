export function getMusicStyleEmoji(style: string): string {
  const styleMap: { [key: string]: string } = {
    "Gipsy Jazz": "🎻",
    Classical: "🎼",
    "Neo-Classical": "🎹",
    "Bossa Nova": "🇧🇷",
    Jazz: "🎷",
    Blues: "🎸",
    Funk: "🕺",
    Reggae: "🇯🇲",
    Folk: "🪕",
    Ambient: "🌌",
    Soul: "🤌🏽",
  };

  return styleMap[style] || "🎶"; // default emoji if not found]
}

export const styleEmojis = {
  "Gipsy Jazz": "🎻",
  Classical: "🎼",
  "Neo-Classical": "🎹",
  "Bossa Nova": "🇧🇷",
  Jazz: "🎷",
  Blues: "🎸",
  Funk: "🕺",
  Reggae: "🇯🇲",
  Folk: "🪕",
  Ambient: "🌌",
  Soul: "🤌🏽",
};
