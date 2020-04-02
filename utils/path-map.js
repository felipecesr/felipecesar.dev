const fs = require('fs')
const path = require('path')

const DIR = path.join(process.cwd(), './posts/')
const files = fs.readdirSync(DIR).filter(file => file.endsWith('.md'))

const parseFileName = file => path.parse(file)

const generateFilePath = (accumulator, file) => {
  const fileName = file.name.replace(/\d{4}-\d{2}-\d{2}-/g, '')
  accumulator[`/${fileName}.html`] = {
    page: '/post',
    query: { id: file.name }
  }
  return accumulator
}

const postsPathMap = files.map(parseFileName).reduce(generateFilePath, {})

const exportPathMap = () => ({
  '/': {
    page: '/'
  },
  ...postsPathMap
})

module.exports = exportPathMap
