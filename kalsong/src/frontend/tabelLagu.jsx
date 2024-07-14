import "../tailwind.css";
import "../index.css"

export const TabelLagu = ({data, num}) => {

    return (
        <div id="containerSong" className="w-10/12 lg:w-1/2 mx-auto flex flex-wrap mt-4 lg:h-72 lg:min-h-72">
        {data.map((song, index) => {
            return (
                <div key={index+num} className="flex-shrink-0 p-1.5 basis-1/5 max-w-[20%]" >
                    <div id="containerImage" className="w-full mx-auto">
                        <img src={song.track.album.images[0].url} className="mx-auto rounded-lg lg:w-24" alt="" />
                    </div>
                    <div className="relative w-full text-xxs md:text-xs text-clip text-center text-white lg:text-sm wrap whitespace-nowrap overflow-hidden justify-center">{`${index+1+num}. ${song.track.name.split(/ [-/()]/)[0]}`}</div>
                    <div className="relative w-full text-xxs md:text-xs text-clip text-center text-white lg:text-xs wrap whitespace-nowrap overflow-hidden">{song.track.artists[0].name === "GAC (Gamaliél Audrey Cantika)" ? "GAC" : song.track.artists[0].name}</div>
                </div>
            )
        })}
        </div>
        
    );
};


export default TabelLagu;
