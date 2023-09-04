export interface Clubs {
  id: string;
  name: string;
  seasonId?: null;
  clubs: Club[];
}

export interface Club {
  id: string;
  name: string;
}

export interface Players {
  id: string;
  clubName: string;
  seasonYear: string;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  position: string;
  dateOfBirth: string;
  age: string;
  nationality: string[];
  height: string;
  foot: string;
  joinedOn: string;
  contract: string;
  marketValue: string;
}

export interface Transfer {
  id: string;
  name: string;
  history: History[];
}

export interface History {
  transferID: string;
  transferSeason: string;
  oldClubID: string;
  oldClubName: string;
  newClubID: string;
  newClubName: string;
  marketValue: string;
  fee: string;
}
