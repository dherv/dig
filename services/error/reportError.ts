export const reportError = ({ message }: { message: string }) => {
  // send the error to our logging service...
  console.error({ message });
};
