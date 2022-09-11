import { getErrorMessage } from "./getErrorMessage";

export const catchError = (error: unknown) => {
  const message = getErrorMessage(error);
  return reportError({ message });
};
