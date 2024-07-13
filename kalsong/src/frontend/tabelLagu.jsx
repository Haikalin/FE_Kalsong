import "../tailwind.css";
import "../index.css"

export const TabelLagu = ({data, num}) => {

    return (
        console.log(data),
        <div className="w-5/6 h-80 min-h-80 lg:h-100 lg:min-h-100 mx-auto text-xs sm:text-base lg:w-5/12 mx-auto lg:text-base md:w-3/4 md:text-base">
            <table id="tabelmusik" className="w-full font-Inter mt-5 border border-black-700 table-fixed">
                <thead>
                    <tr>
                        <th className="bg-second-two border border-black text-black px-4 py-2 w-2/12 lg:w-1/12 font-bold">No</th>
                        <th className="bg-second-two border border-black text-black px-12 py-2 w-6/12 lg:w-7/12 font-bold" >Judul Lagu</th>
                        <th className="bg-second-two border border-black text-black px-4 py-2 w-4/12 font-bold">Artis</th>
                    </tr>
                </thead>
                <tbody id="isitabel" className="fade-in">
                    {data.map((song, index) => {
                        return (
                            <tr key={index + num} className={`w-full ${index % 2 === 0 ? 'bg-light-one' : 'bg-light-second'}`}>
                                <td className="py-1 border border-black lg:w-1/12 text-center">{index + num + 1}</td>
                                <td className="py-1 border border-black lg:w-7/12  whitespace-nowrap overflow-hidden text-ellipsis">
                                    <a href={song.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                        {song.track.name.split(/ [-/()]/)[0]}
                                    </a>
                                </td>
                                <td className="py-1 border border-black w-4/12 whitespace-nowrap overflow-hidden text-ellipsis">{song.track.artists[0].name === "GAC (Gamaliél Audrey Cantika)" ? "GAC" : song.track.artists[0].name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};


export default TabelLagu;
