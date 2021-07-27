import ts from 'rollup-plugin-typescript2'; // ts complier
import resolvePlugin from '@rollup/plugin-node-resolve' // third party complier
import path from 'path'; // path handler
// get packages path
let packagesDir = path.resolve(__dirname, 'packages');
let packageDir = path.resolve(packagesDir, process.env.TARGET);
console.log('packageDir: ', packageDir);

// get paths package.json

const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve('package.json'))
console.log('pkg: ', pkg);
const packageOptions = pkg.buildOptions;
console.log('packageOptions: ', packageOptions);
const name = path.basename(packageDir);
console.log('name: ', name);

// three types: import/require/window.xx
const outputConfig = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es'
  },
  'cjs': {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs'
  },
  'global': {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife'
  }
}

function createConfig(format, output) {
  output.name = packageOptions.name
  output.sourcemap = true;
  return {
    input: resolve(`src/index.ts`),
    output,
    plugins: [
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      resolvePlugin()
    ]
  }
}

// create config by format type selected by users
export default packageOptions.formats.map(format => createConfig(format, outputConfig[format]))