import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.css';

type VideoPlayerProps = {
  url: string;
};

const VideoPlayer = ({ url }: VideoPlayerProps) => {
  return (
    <>
      <ReactPlayer url={url} width='100%' controls={true} />
    </>
  );
};

export default VideoPlayer;
