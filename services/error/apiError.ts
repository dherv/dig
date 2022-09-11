import { NextApiResponse } from "next";
import { ErrorService } from ".";

export const apiError = (error: unknown, res: NextApiResponse) => {
  const message = ErrorService.getErrorMessage(error);
  ErrorService.reportError({ message });
  return res.status(500).json({ message });
};
