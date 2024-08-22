import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAPI } from "../../utils/fetch-api";
import Block from "./Block/Block";

export default function SingleSong() {
  const { songId } = useParams();
  const [song, setSong] = React.useState<any>({});

  useEffect(() => {
    fetchAPI(`/songs/${songId}`).then((data) => {
      setSong(data.data.attributes);
    });
  }, [songId]);

  if (Object.keys(song).length === 0) {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">{song?.name}</h1>
      <div className="grid grid-cols-1 gap-3 text-lg">
        {song.content.map((block: any, index) => {
          return <Block data={block} key={index} />;
        })}
      </div>
    </div>
  );
}
