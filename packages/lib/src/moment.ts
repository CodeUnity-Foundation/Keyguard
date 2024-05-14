import moment from "moment";

import { DurationConstructor } from "./types";

export const addDateTime = (time: number, unit: DurationConstructor) => {
  const now = moment();
  const newDate = now.add(time, unit);
  return newDate;
};
