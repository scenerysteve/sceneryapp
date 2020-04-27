import Status from "./Status";

export default interface Scene {
  description: string;
  readonly id: string;
  isPlot: boolean;
  status: Status;
  title: string;
}
