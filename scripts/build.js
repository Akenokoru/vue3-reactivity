// monorepo complier

// node
const fs = require('fs')
const execa = require('execa')

const dirs = fs.readdirSync('packages').filter(path => {
  if(!fs.statSync(`packages/${path}`).isDirectory()) {
    return false;
  }
  return true;
})
console.log(dirs);

async function build(target) {
  console.log('target--', target)
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {stdio: 'inherit'})
}

async function runParallel(dirs, iterFn) {
  let result = []
  for(let item of dirs) {
    result.push(iterFn(item))
  }
  return Promise.all(result)
}

runParallel(dirs, build).then(() => {
  console.log('success')
})