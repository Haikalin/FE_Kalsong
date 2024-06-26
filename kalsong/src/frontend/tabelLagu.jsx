import "../tailwind.css";
import "../index.css"
import {useState, useEffect} from "react";

export const TabelLagu = ({data, num}) => {

    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        const table = document.getElementById("tabelmusik");
        document.getElementById("tabelmusik").classList.remove("fade-in");
        void table.offsetWidth;
        document.getElementById("tabelmusik").classList.add("fade-in");
    }, [data]);

    return (
        console.log(data),
        <div className="w-3/4 mx-auto text-xs lg:w-5/12 mx-auto lg:text-base md:w-3/4 md:text-base">
            <table id="tabelmusik" className="w-full bg-gray-800 mt-5 border border-gray-700 fade-in">
                <thead>
                    <tr>
                        <th className="bg-black text-white px-4 py-2 w-1/12">No</th>
                        <th className="bg-black text-white px-12 py-2 w-8/12">Judul Lagu</th>
                        <th className="bg-black text-white px-4 py-2 w-3/12">Artis</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((song, index) => {
                        return (
                            <tr key={index + num}>
                                <td className="py-1 border border-gray-700 text-center bg-white">{index + num + 1}</td>
                                <td className="py-1 border border-gray-700 bg-white">
                                    <a href={song.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                        {song.track.name}
                                    </a>
                                </td>
                                <td className="py-1 border border-gray-700 bg-white">{song.track.artists[0].name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};


export default TabelLagu;
