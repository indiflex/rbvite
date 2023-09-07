export default () => ({
  Port: 3500,
  emailOptions: {
    service: 'Gmail',
    auth: {
      user: 'indiflex.corp@gmail.com',
      pass: process.env.EMAIL_PASS,
    },
  },
});
