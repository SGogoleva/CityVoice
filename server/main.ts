import env from './src/config';
import app from './src/index';

app.listen(env.PORT, () => {
  console.info(`Environment: ${env.NODE_ENV}`);
  console.info(`Server is running on http://localhost:${env.PORT}`);
});
