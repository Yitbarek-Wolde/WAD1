
import 'react-h5-audio-player/lib/styles.css';
import { addsong } from '../../fetch/fetchMusic';
import { musicType, playType } from '../../../../types/types';

type Proptype = {
  musiclist: musicType[],
  playlist: playType[],
  setPlaylist: (e:playType[])=> void;
  
}



export function AllSongs(props: Proptype) {
  const { musiclist, setPlaylist, playlist } = props

  return (<> 
    <h2>Songs</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Title</th>
          <th scope="col">Release Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {musiclist.map((i: musicType, index: number) => (<tr key={i.id}>
          <th scope="row" >{index + 1}</th>
          <td>{i.title}</td>
          <td>{i.releaseDate}</td>
          <td>
          
                <i className="btn" role="button" data-bs-toggle="button" style={{border: "3px"}}
               onClick={() =>{ addsong(i.id); setPlaylist([...playlist, {
                "id": i.id,
                "songId": i.id,
                "urlPath": i.urlPath,
                "title": i.title, 
                
                } ]) }} > <p style={{fontSize: '30px'}}>+</p> 
              </i>
     
          
            </td>
    </tr>)

    )
      }

  </tbody >
    </table >
    </>
  )
}