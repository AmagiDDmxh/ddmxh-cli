const parseArgs = require('minimist')
const execa = require('execa')

// console.log(process.argv)
// const allOptionsList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
// const args = parseArgs(process.argv.slice(2), { stopEarly: true, boolean: allOptionsList })

// const run = (input) => {
//   process.exitCode = shx.call(input, process.argv);
// }

const unset = false
const gitProxyKeys = ['http.proxy', 'https.proxy']
const gitSettingAttrs = ['config', '--global']
if (unset) {
  gitSettingAttrs.push('--unset')
}
// const gitUnsetAttrs = ['config', '--global', '--unset']
const DEFAULT_PROXY_ADDRESS = process.env['http_proxy']

!(async () => {
  try {
    for (const key of gitProxyKeys) {
      let arguments = gitSettingAttrs.concat(key)

      if (!unset) arguments.push(DEFAULT_PROXY_ADDRESS)

      const { stdout } = await execa('git', arguments)
      console.log('stdout', stdout)
    }
  } catch (error) {
    console.log('an error occurred', error)
  }
})()
