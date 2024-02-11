import { useAudio } from "@/lib/store/audio";
import { FastForward, Pause, Play, Repeat, Rewind, Volume, Volume2 } from "lucide-react";
import { toast } from "sonner";

export default function MusicControl() {
  const { audio, isPlaying, toggleIsPlaying } = useAudio();

  const alertNotSupport = () => {
    toast.info("Coming soon...");
  };

  const handlePlay = () => {
    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
    toggleIsPlaying();
  };

  const handleRewind = () => {
    console.log(audio?.currentTime);
  }

  return (
    <div className="flex justify-between items-center mt-8">
      <div className="text-gray-800 hover:cursor-pointer" onClick={alertNotSupport}>
        <Repeat className="" strokeWidth={2.5}/>
      </div>
      <div className="text-gray-800 hover:cursor-pointer" onClick={alertNotSupport}>
        <Rewind fill="currentColor"/>
      </div>
      <div
        onClick={handlePlay}
        className="text-black p-8 rounded-full bg-yellow-light shadow-lg"
      >
        {isPlaying ? (
          <Pause fill="currentColor" />
        ) : (
          <Play fill="currentColor" />
        )}
      </div>
      <div className="text-gray-800" onClick={alertNotSupport}>
        <FastForward fill="currentColor"/>
      </div>
      <div className="text-gray-800" onClick={alertNotSupport}>
        <Volume2 strokeWidth={2.5}/>
      </div>
    </div>
  );
}
