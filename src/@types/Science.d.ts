interface Science {
  scienceId: number | string;
  scienceName: string;
}

interface SelectedScience {
  firstScienceId?: number | string;
  secondScienceId?: number | string;
}

interface ScienceContext {
  sciences: SelectedScience;
  setSciences: (sciences: SelectedScience) => void;
}
