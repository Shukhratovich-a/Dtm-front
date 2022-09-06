interface Direction {
  directionId: number;
  directionName: string;
  scienceRegion: Region;
  directionQuota: Quota;
  firstScience: Science;
  secondScience: Science;
}

interface DirectionContext {
  directions: Direction[];
  setDirections: (sciences: Direction[]) => void;
}
