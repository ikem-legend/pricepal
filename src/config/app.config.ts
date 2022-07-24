export default () => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  saltRounds: process.env.SALT_ROUNDS,
});
