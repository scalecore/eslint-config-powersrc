const process = require('node:process')
const del = require('del')

const verbose = process.argv.includes('-v') || process.argv.includes('--verbose')

async function clean () {
  try {
    const files = await del(['dist/**', 'dist'])
    if (verbose) {
      console.log(files.map(file => `deleted ${file}`).join('\n'))
    }
  } catch (reason) {
    console.error(reason)
  }
}

clean()
