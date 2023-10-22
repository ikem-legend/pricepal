// Generate random six digit confirmation token
export const generateConfirmationToken = () =>
  Math.floor(Math.random() * 900001 + 100000);
