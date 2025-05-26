type Props = {
  id: string;
};

export default function YoutubeEmbed({ id }: Props) {
  return (
    <div className="my-10 px-3">
      <iframe
        className="rounded-lg"
        width={560}
        height={315}
        src={`https://www.youtube.com/embed/${id}?si=moxbfUAPMiN2598a`}
        allowFullScreen
      />
    </div>
  );
}
