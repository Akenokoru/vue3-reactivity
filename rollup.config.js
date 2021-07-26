// import ts from 'rollup-plugin-typescript2'; // ts complier
// import resolvePlugin from '@rollup/plugin-node-resolve' // third party complier
import path from 'path'; // path handler
// get packages path
let packagesDir = path.resolve(__dirname, 'packages');
let packageDir = path.resolve(packagesDir, process.env.TARGET);
console.log('packageDir: ', packageDir);

// get paths package.json

const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve('package.json'))
console.log('pkg: ', pkg);



const outputConfig = {
  'esm-bundler': {
    file: '',
    format: 'es'
  },
  'cjs': {
    file: '',
    format: 'cjs'
  },
  'global': {
    file: '',
    format: 'iife'
  }
}

export default [
  
]