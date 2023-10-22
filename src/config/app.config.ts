export default () => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  saltRounds: process.env.SALT_ROUNDS,
  supportEmailHost: process.env.SUPPORT_EMAIL_HOST,
  supportEmailAddress: process.env.SUPPORT_EMAIL_ADDRESS,
  supportEmailPassword: process.env.SUPPORT_EMAIL_PASSWORD,
});
