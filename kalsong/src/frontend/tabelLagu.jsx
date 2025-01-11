import React from 'react';
import { Play } from 'lucide-react';

const TabelLagu = ({ data, num, clickSong }) => {
  return (
    <div className="w-[95%] sm:w-[85%] max-w-4xl mx-auto pt-8">
      <div
        id="containerSong"
        className="grid grid-cols-5 gap-4 px-4"
      >
        {data.map((song, index) => (
          <div
            key={index + num}
            onClick={() => clickSong(song)}
            className="group relative hover:bg-gray-800 transition-all duration-300 rounded cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative">
              <img
                src={song.track.album.images[0].url}
                className="w-full aspect-square object-cover rounded"
                alt={song.track.name}
                loading="lazy"
              />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-black hover:scale-105 hover:bg-green-400 transition-all shadow-lg">
                  <Play className="h-4 w-4 fill-current" />
                </button>
              </div>
            </div>

            {/* Song Info */}
            <div className="text-center py-2">
              <div className="text-white text-xs md:text-sm leading-tight truncate">
                {`${index + 1 + num}. ${song.track.name.split(/ [-/()]/)[0]}`}
              </div>
              <div className="text-gray-400 text-xs leading-tight truncate">
                {song.track.artists[0].name === "GAC (Gamaliél Audrey Cantika)"
                  ? "GAC"
                  : song.track.artists[0].name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabelLagu;