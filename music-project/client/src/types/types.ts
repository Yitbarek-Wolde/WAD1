export interface musicType {
   
    id: string;
    urlPath: string;
    title: string;
    releaseDate: string;

  }

  export type playType = oldPlayType | modePlayType
  
  export interface oldPlayType {
    id: string;
    userId: string;
    songId: string;
    orderId: number;
    title: string;
    urlPath: string;
  }

  export interface modePlayType {
   
    id: string;
    songId: string;
    urlPath: string;
    title: string;

  }