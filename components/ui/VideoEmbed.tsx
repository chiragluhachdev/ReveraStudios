"use client";

type Source = { type: "youtube" | "vimeo" | "mp4"; src: string };

/**
 * Unified player used in the showreel lightbox.
 * Supports YouTube ids, Vimeo ids, and local/hosted MP4 paths.
 */
export default function VideoEmbed({
  source,
  autoPlay = true,
  title = "Video",
}: {
  source: Source;
  autoPlay?: boolean;
  title?: string;
}) {
  if (source.type === "mp4") {
    return (
      <video
        className="h-full w-full object-cover"
        src={source.src}
        controls
        autoPlay={autoPlay}
        playsInline
      />
    );
  }

  const url =
    source.type === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${source.src}?autoplay=${
          autoPlay ? 1 : 0
        }&rel=0&modestbranding=1&playsinline=1`
      : `https://player.vimeo.com/video/${source.src}?autoplay=${
          autoPlay ? 1 : 0
        }&title=0&byline=0&portrait=0`;

  return (
    <iframe
      className="h-full w-full"
      src={url}
      title={title}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  );
}
