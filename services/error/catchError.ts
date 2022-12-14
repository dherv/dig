import { getErrorMessage } from "./getErrorMessage";
import { reportError } from "./reportError";
export const catchError = (error: unknown) => {
  const message = getErrorMessage(error);
  return reportError({ message });
};
