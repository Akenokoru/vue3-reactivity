const execa = require('execa')

async function build(target) {
  console.log('target--', target)
  await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], {stdio: 'inherit'})
}

build('reactivity')