const npm = require('npm')
const program = require('commander')

const PKG = require('./package.json')
const NPM_PROXY_ATTRS = ['proxy', 'https-proxy']

// const

const DEFAULT_PROXY_ADDRESS = process.env['http_proxy']

program.version(PKG.version, '-v', '--version').usage('[options] <args ...>')

program
  .option(
    '-a, --address [proxyAddress]',
    'Specificify proxy address or leave it to use default from env',
    DEFAULT_PROXY_ADDRESS
  )
  .description('Default to set proxies')
  .action(onSetProxy)

program
  .command('del')
  .description('Delete proxies config on npm')
  .action(onDelProxy)

program
  .command('proxy <target>')
  .description('Set proxy of <tartget>')
  .action(onTargetProxy)

program.parse(process.argv)

/*---------------------------*/

function npmConfig(attrArray, map, index = 0) {
  return new Promise((resolve, reject) => {
    const attr = attrArray[index]
    const command = map.hasOwnProperty(attr)
      ? ['set', attr, String(map[attr])]
      : ['delete', attr]
    npm.load(function (err) {
      if (err) return reject(err)
      npm.commands.config(command, function (err, data) {
        return err ? reject(err) : resolve(index + 1)
      })
    })
  }).then((next) => {
    return next < attrArray.length
      ? npmConfig(attrArray, map, next)
      : Promise.resolve()
  })
}

function printMessages(infos) {
  infos.forEach((info) => console.log(info))
}

function printError(err) {
  console.error('An error occured:', err)
}

function exit(err) {
  printError(err)
  process.exit(1)
}

function onSetProxy({ address }) {
  const map = Object.values(NPM_PROXY_ATTRS).reduce(
    (acc, cur) => ({ ...acc, [cur]: address }),
    {}
  )
  return npmConfig(NPM_PROXY_ATTRS, map)
    .then(() => {
      printMessages(['', `proxy been set to ${address}`, ''])
    })
    .catch((err) => {
      exit(err)
    })
}

function onDelProxy() {
  return npmConfig(NPM_PROXY_ATTRS, {})
    .then(() => {
      printMessages(['', `proxy been deleted`, ''])
    })
    .catch((err) => {
      exit(err)
    })
}

function onTargetProxy(target) {
  // if (target === 'git') {
  //   shx
  // }
  const gitProxyKeys = ['http.proxy', 'https.proxy']
  const gitAttrs = [, , 'git', 'config', 'set', '--global']

  // gitProxyKeys.forEach((key) => {
  //   shx(gitAttrs.concat([key, DEFAULT_PROXY_ADDRESS]))
  // })
}

module.exports = {
  onSetProxy,
  onDelProxy,
  onTargetProxy,
}
