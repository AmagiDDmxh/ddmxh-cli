# @ddmxh/cli

A cli for common configutations, it should help to setup npm and git proxy, npm registry and miscellaneous stuff.

## Options

Currently it has only two command usages

```bash
ddmxh # setup npm proxy by 'http_proxy' in the env variables
ddmxh del # delete npm proxy
```

## Ideal usage

```bash
ddmxh proxy # no target given so to set all targets, git and npm
ddmxh proxy git # setting gits proxy
ddmxh proxy npm # setting npms proxy
ddmxh proxy http://host@server:port # set all proxy with given address

# Change npm registry
ddmxh use cnpm # it should set npm registry to cnpmjs.org and cancel the proxy

# Check codes written
ddmxh code today # checkout how many lines of code wrttien today
ddmxh code yesterday # same but to yesterday
ddmxh code 20200801 amagiddmxh # check out how many line of codes were written by amagiddmxh at date 20200801
ddmxh code repo [name] # create repo
ddmxh code repo [upload | up] # push to master
```

### References

- <https://github.com/Pana/nrm> - npm version control
- <https://github.com/vuejs/vue-cli> - vue project CLI helper
- <https://github.com/shelljs/shx> - execute safe shell on npm
- <http://github.com/sapegin/mrm> - sync your configurations
- <https://gist.github.com/alexpchin/dc91e723d4db5018fef8> - create new repo