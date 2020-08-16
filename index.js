const npm = require('npm')
const program = require('commander')

const PKG = require('./package.json')
const NPM_PROXY_ATTRS = ['proxy', 'https-proxy']
// const

const proxyAddress = process.env['http_proxy']

program.version(PKG.version, '-v', '--version').usage('[options] <args ...>')

program
  .option(
    '-a, --address [proxyAddress]',
    'Specificify proxy address or leave it to use default from env',
    proxyAddress
  )
  .description('Default to set proxies')
  .action(onSetProxy)

program
  .command('del')
  .description('Delete proxies config on npm')
  .action(onDelProxy)

program.parse(process.argv)

/*---------------------------*/

function config(attrArray, map, index = 0) {
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
      ? config(attrArray, map, next)
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
  return config(NPM_PROXY_ATTRS, map)
    .then(() => {
      printMessages(['', `proxy been set to ${address}`, ''])
    })
    .catch((err) => {
      exit(err)
    })
}

function onDelProxy() {
  return config(NPM_PROXY_ATTRS, {})
    .then(() => {
      printMessages(['', `proxy been deleted`, ''])
    })
    .catch((err) => {
      exit(err)
    })
}

module.exports = {
  onSetProxy,
  onDelProxy,
}
