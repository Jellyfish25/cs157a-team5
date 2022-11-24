export interface User {
  username: string;
  userType?: 'customer' | 'employee' | 'contentCreator';
}

export interface Media {
  title: string;
  cost: string;
  type: 'game' | 'book' | 'movie' | 'musicAlbum' | '';
}
