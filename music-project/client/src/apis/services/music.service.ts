import http from "../axios";


const getPlaylist = () => {
  return http.get("/api/playlist");
};

const getAllMusics = () => {
  return http.get("/api/music");
};

const getMusic = (title: string) => {
  return http.get(`/api/music?search=${title}`);
};

const addOrRemove = (title: string, musicId: string) => {
  return http.post(`/api/playlist/${title}`, {"songId": musicId});
};


export default {
  getAllMusics,
  getMusic,
  getPlaylist,
  addOrRemove
};
