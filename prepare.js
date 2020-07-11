let fs = require('fs')
let path = require('path')
let execSync = require('child_process').execSync
let rimraf = require('rimraf')
let packageJson = require('./package.json')

const LIB_DIR = path.resolve('lib')

const CMD = process.argv.slice(2).join(' ')

// files to cleanup to avoid packing
const CLEANUP_FILES = [
  'node_modules',
  'package-lock.json'
]

// .npmignore
const NPM_IGNORE = [
  '.*',
  '*.tgz',
  'node_modules',
  'package-lock.json'
]

function cleanup() {
  CLEANUP_FILES.forEach(f => rimraf.sync(path.join(LIB_DIR, f)))
}

/**
 * Prepares the lib directory for distributting
 */
function prepare() {

  // ensure directory exists
  if (!fs.existsSync(LIB_DIR)) fs.mkdirSync(LIB_DIR)

  console.log("Preparing", LIB_DIR)

  cleanup()

  // write ignore file
  fs.writeFileSync(path.join(LIB_DIR, '.npmignore'), NPM_IGNORE.join('\n'))

  // copy all the allowed files to the lib directory
  packageJson.files = packageJson.files.reduce((files, p) => {
    if (!p.match(/(lib|index\.js)/)) {
      fs.copyFileSync(path.resolve(p), path.join(LIB_DIR, p))
      files.push(p)
    }
    return files
  }, [
    '**/*.js',
    '**/*.ts'
  ])

  // override entry files
  packageJson.main = 'index.js'
  packageJson.module = 'index.js'
  packageJson.typings = 'index.d.ts'

  // clear all scripts
  packageJson.scripts = {}
  packageJson.devDependencies = {}

  let data = JSON.stringify(packageJson, null, 2)

  // write new package.json for lib
  fs.writeFileSync(path.join(LIB_DIR, 'package.json'), data)

  console.log("Prepared", LIB_DIR)
}

function main() {
  prepare()

  if (CMD) {
    // execute within lib dir
    let npm_cmd = "npm " + CMD

    console.log("\nExecuting command:", npm_cmd, "\n")

    // execute command
    execSync(npm_cmd, { cwd: LIB_DIR, env: process.env, stdio: 'inherit' })

    console.log("\nCompleted command\n")

    // if we created a tar file, copy to parent directory
    let tarball = packageJson.name + '-' + packageJson.version + '.tgz'
    let tarballPath = path.join(LIB_DIR, tarball)
    if (fs.existsSync(tarballPath)) {
      console.log("Copying", tarball, "to correct folder")
      fs.renameSync(tarballPath, path.join(path.dirname(LIB_DIR), tarball))
    }
  }

  cleanup()
}

main()