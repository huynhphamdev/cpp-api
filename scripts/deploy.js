const argv = require('minimist')(process.argv.slice(2))
const { execSync } = require('child_process')

const { server } = argv
const {
  host,
  region,
  image,
  cluster,
  service,
  envFile,
  pm2PublicKey,
  pm2SecretKey,
} = require('../config/deployment')[server]
const imageUrl = `${host}/${image}`

const revision = Date.now()

const run = async (command) => {
  console.log(command)
  const stdout = execSync(command)
  console.log(stdout.toString())
}

const deploy = async () => {
  await run(`docker build -t ${image} --build-arg revision=${revision} --build-arg envFile=${envFile} --build-arg pm2PublicKey=${pm2PublicKey} --build-arg pm2SecretKey=${pm2SecretKey} .`)
  await run(`docker tag ${image} ${imageUrl}`)
  await run(`aws ecr get-login-password  --profile learning-platform --region ${region} | docker login --username AWS --password-stdin ${host}`)
  await run(`docker push ${imageUrl}`)
  await run(`aws ecs update-service --profile learning-platform --cluster ${cluster} --service ${service} --force-new-deployment`)
  await run('docker image prune -f')
}

deploy().then(() => console.log(`Done. Revision: ${revision}`))
