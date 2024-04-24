import { useState } from 'react';
import musicService from '../../../../apis/services/music.service';
import * as ls from "local-storage";
import { useNavigate } from 'react-router-dom';


export default function HeaderNav(props: any) {
  const { setMusiclist } = props
  const pageroute = useNavigate()
  const [searchString, setSearch] = useState<string>('')
  const logoutUser = () => { ls.clear(); pageroute('/') }

  async function search() {
    try {
      let response = await musicService.getMusic(searchString)
      setMusiclist(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (

    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid ">
        <div>
          <a className="navbar-brand" href="#">Ymusic</a>
          <a className="navbar-brand" href="#">Playlist</a>
        </div>

        <div className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn-outline-success" onClick={search}>Search</button>
        </div>
        <button className="btn btn-danger" type="submit" onClick={logoutUser}>Logout</button>

      </div>
    </nav>
  )
}