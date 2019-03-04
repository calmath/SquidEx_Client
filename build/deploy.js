'use strict'
process.env.NODE_ENV = 'production'

const ora = require('ora')
const path = require('path')
const copy = require('recursive-copy');
const rm = require('rimraf')
const chalk = require('chalk')
const config = require('../config')

const spinner = ora('deploying to nginx...\n')
spinner.start()

var options = {
  overwrite: true
};

rm(path.join(config.nginx.assetsWebRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  console.info(chalk.green('    Removed static folder'));
  copy(path.resolve(__dirname, '../dist/'), config.nginx.assetsWebRoot, options)
    .on(copy.events.COPY_FILE_COMPLETE, function(copyOperation) {
      console.info(chalk.green('    Copied to ' + copyOperation.dest));
    })

    .on(copy.events.ERROR, function(error, copyOperation) {
      console.error('\n' + chalk.red('  Unable to copy ' + copyOperation.dest));
    })
    .then(function(results) {
      spinner.stop()
      console.info(chalk.cyan('\n  ' + results.filter(obj => {
        return obj.src.indexOf('.', obj.src.lastIndexOf('\\')) != -1
      }).length + ' file(s) copied'))
      console.log(chalk.cyan('  Deploy complete.\n'))
      console.log(chalk.yellow(
        '  Tip: deployed files are available on the nginx server at http://localhost.\n'
      ))
    })
    .catch(function(error) {
      spinner.stop()
      console.log(chalk.red('  ' + error + '\n'))
      console.log(chalk.red('  Deploy failed with errors.\n'))
    })
})