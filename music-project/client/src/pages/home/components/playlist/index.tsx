import { useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { removesong } from '../../fetch/fetchMusic';
import { playType } from '../../../../types/types';


type PropType = {
    playlist: playType[],
    setPlaylist: (e:playType[] )=>void;
}

export default function PlayListComponent(prop: PropType) {
    
    let { playlist, setPlaylist } = prop
    let [playNow, setPlayNow] = useState('')
    const [songTitle, setSongTitle] = useState('')
    const [ suffl, setSuffle ] = useState<any>(false)

    function shuffle() {
        setSuffle(!suffl)
            let randNum = Math.floor(Math.random()*playlist.length)
            setPlayNow("http://localhost:3005/" + playlist[randNum].urlPath)
            setSongTitle(playlist[randNum].title)


}

function newshuffle() {
    
        let randNum = Math.floor(Math.random()*playlist.length)
        setPlayNow("http://localhost:3005/" + playlist[randNum].urlPath)
        setSongTitle(playlist[randNum].title)


}


    
    function nextSong() {
        if(suffl)
            return newshuffle()
        for (let i = 0; i < playlist.length; i++) {
            console.log(playNow)
            if ("http://localhost:3005/" + playlist[i].urlPath === playNow) {
                if (i + 1 !== playlist.length){
                    setPlayNow("http://localhost:3005/" + playlist[i + 1].urlPath)
                    setSongTitle(playlist[i + 1].title)
                
                }
                
                else{
                    setPlayNow("http://localhost:3005/" + playlist[0].urlPath)
                    setSongTitle(playlist[0].title)
}
            }
        }

    }

   

    function previousSong() {
        if(suffl)
            return newshuffle()
        for (let i = 0; i < playlist.length; i++) {
            if ("http://localhost:3005/" + playlist[i].urlPath === playNow) {
                if (i - 1 !== -1) {
                    setPlayNow("http://localhost:3005/" + playlist[i - 1].urlPath)
                    setSongTitle(playlist[i-1].title)
                } else
                    setPlayNow("http://localhost:3005/" + playlist[playlist.length - 1].urlPath)
                    setSongTitle(playlist[playlist.length - 1].title)
            }
        }

    }

    return (
        <>
            <div className='container-sm' >
                <h2>Your Playlist</h2>
                <table className="table table-striped table-dark table-bordered">

                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col" align='center'>Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {playlist.map((i: any, index: number) => {
                            return (<tr key={i.id}>
                                <th scope="row" >{index+1}</th>
                                <td>{i.title}</td>
                                <td>
                                    <table className="table table-dark">
                                        <td>
                                            <button className="btn btn-danger"
                                                onClick={() => { removesong(i.id); setPlaylist(playlist.filter((a: any)=> a.id !== i.id)) }}>Remove</button>

                                        </td>
                                        <td>
                                            <button className="btn btn-success" 
                                                onClick={() => {setPlayNow("http://localhost:3005/" + i.urlPath); setSongTitle(i.title)}}> play</button>
                                        </td>
                                    </table>
                                </td>

                            </tr>)
                        }
                        )
                        }

                    </tbody>
                </table>
            </div>
                    <div>
            { songTitle && <p>Now Playing: {songTitle}</p>}
            <AudioPlayer
            
                autoPlay
                
                src={playNow}
                onPlay={() => console.log("on play")}
                showSkipControls
                onClickNext={nextSong}
                onClickPrevious={previousSong}
                hasDefaultKeyBindings={true}
                onEnded={nextSong}
                customAdditionalControls={
                    [RHAP_UI.LOOP,
                <button onClick={shuffle} >Shufflle</button>]}
            /></div>
        </>
    )
}