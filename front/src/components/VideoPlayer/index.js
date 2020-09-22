import React from 'react';
import './styles.css';
import ReactPlayer from "react-player";

export default function VideoContainer({ url }) {
  return (
    <div className="video-container">
      <ReactPlayer playing={true}
        url={url}
        height="100%"
        width="100%"
        volume={0.3}
        controls={true}
      />
    </div>
  );
}