 
import { useEffect, useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import musicService from '../../apis/services/music.service';

import * as ls from "local-storage";
import { useNavigate } from 'react-router-dom';
import { AllSongs } from './components/allSongs';
import PlayListComponent from './components/playlist';

import HeaderNav from './components/header';
import { musicType, playType } from '../../types/types';

export default function Home() {

  let pageroute = useNavigate()

  if (!ls.get('secret')) {
    ls.clear();
    pageroute('/')
    console.log(ls.get('secret'))
  }

  const [musiclist, setMusiclist] = useState<musicType[]>([])
  const [playlist, setPlaylist] = useState<playType[]>([])

  useEffect(() => { 
   
    async function getfile() {
       try{
      const res = await musicService.getAllMusics()
      const play = await musicService.getPlaylist()
      setMusiclist(res.data)
      setPlaylist(play.data)
    }catch(error){
      if(error instanceof Error)
          console.log(error.message)
    }
    }
    getfile()
  }, [])
 
  return (

    < div className='container-md bg-secondary-subtle' >

      <HeaderNav setMusiclist={setMusiclist} />
      <AllSongs musiclist={musiclist} setPlaylist={setPlaylist} playlist={playlist} />
      <PlayListComponent playlist={playlist} setPlaylist={setPlaylist} />

    </div>
  );
}
