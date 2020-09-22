import React, { useEffect } from 'react';
import RootPage from '../../components/RootComponent';
import VideoPlayer from '../../components/VideoPlayer';
import ChatComponent from '../../components/Chat';

export default function Chat() {
  const video_url = localStorage.getItem('video_url');
  console.log(video_url);

  return (
    <RootPage>
      <VideoPlayer url={video_url} />
      <ChatComponent />
    </RootPage>
  )
}