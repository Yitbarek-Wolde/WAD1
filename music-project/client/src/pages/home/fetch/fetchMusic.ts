import musicService from "../../../apis/services/music.service"



export async function addsong(id: string) {
    try{
    let response = await musicService.addOrRemove('add', id)
    console.log(response.status)}
    catch(error){if (error instanceof Error)
      console.log(error.message, 'request get from add song')
    }
  }

  export async function removesong(id: string) {
    try{
    let response = await musicService.addOrRemove('remove', id)
    console.log(response.status)}
    catch(error){if (error instanceof Error)
      console.log(error.message, 'request get from remove')
    }
  }


  