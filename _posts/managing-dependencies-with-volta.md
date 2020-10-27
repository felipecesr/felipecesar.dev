---
language: en
title: Managing dependencies with Volta
date: 2020-10-27T14:03:18.263Z
---
In this post I will talk about [Volta](https://volta.sh/) and why I stopped using [NVM](http://nvm.sh/).

# What is Volta?
Volta is a command-line tool that allows you to install and execute any JavaScript tool perfectly. It ensures everyone in the project has the same tools, whit same versions.

To install you just need to run a command:
```bash
# install Volta
curl https://get.volta.sh | bash
```

Then, we can install any tool and use it normally:
```bash
# install Node
volta install node

# start using Node
node
```

You can pin versions in your projects as well:
```bash
volta pin node yarn
```

This command will add the versions in an object in `package.json`.
```json
"volta": {
  "node": "12.19.0",
  "yarn": "1.22.10"
}
```

If you don't have this versions, Volta will download them on the fly for you.

# Why did I stop using NVM?

When I heard about Volta for the first time, I thought: I don't need that, I've already using NVM.

Even so, I decided to take a look at Volta and realised that I was wrong. With NVM I was able to managing versions of Node, with Volta I can do this for any tool.

Furthermore, NVM has some points that bothered me:

* I always needed to change the versions manually. To automate this it was necessary to add some settings to the shell, as well as add a `.nvmrc` file to the project.

* There is a delay to change versions. With Volta this change is really faster and no-additional settings is required, it does it automatically.

# Conclusion

This post was a brief introduction to Volta and some pros that I see compared to NVM, if you saw another pros or cons tell me in the comments.