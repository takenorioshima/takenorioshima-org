type Props = {
  id: string;
};

export default function AppleMusicEmbed({ id }: Props) {
  return (
    <div className="my-10 px-3">
      <iframe
        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
        height={450}
        style={{ width: "100%", maxWidth: 1200, overflow: "hidden", borderRadius: 10 }}
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src={`https://embed.music.apple.com/jp/album/${id}`}
      />
    </div>
  );
}
