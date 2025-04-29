export function getMusicStyleEmoji(style: string): string {
  const styleMap: { [key: string]: string } = {
    "Gipsy Jazz": "🎻",
    Classical: "🎼",
    "Neo-Classical": "🎹",
    "Bossa Nova": "🇧🇷",
    Jazz: "🎷",
    Blues: "🎸",
    Rock: "🤘",
    Pop: "🎤",
    Electronic: "🎧",
    Funk: "🕺",
    Reggae: "🇯🇲",
    "Hip Hop": "🎧",
    Country: "🤠",
    Folk: "🪕",
    Latin: "🪇",
    Metal: "🔥",
    Ambient: "🌌",
    Soul: "💖",
  };

  return styleMap[style] || "🎶"; // default emoji if not found
}
