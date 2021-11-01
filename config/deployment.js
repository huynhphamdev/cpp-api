module.exports = {
  production: {
    host: '750633080987.dkr.ecr.ap-southeast-1.amazonaws.com',
    region: 'ap-southeast-1',
    image: 'learning-platform:latest',
    cluster: 'learning-c-cluster',
    service: 'learning-platform-service',
    envFile: '.env.prod',
    pm2PublicKey: '9crvsrdkcavum8t',
    pm2SecretKey: 'f23pr9nrh2o9fy7',
  },
}
