export const handleError = (status, messgage) => {
  const err = new Error();
  err.status = status;
  err.message = messgage;
  return err;
};
