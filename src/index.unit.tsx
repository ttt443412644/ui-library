import fs from 'fs'

import * as kirk from '~/index'
import * as icon from '~/icon'

const lowercase = (string: string) => string.charAt(0).toLowerCase() + string.slice(1)

const getComponentDirectories = (srcpath: string) =>
  fs
    .readdirSync(srcpath)
    .filter(
      file =>
        fs.statSync(`src/${file}`).isDirectory() &&
        !file.startsWith('_') &&
        !file.startsWith('icon') &&
        !file.startsWith('typings'),
    )

const components = Object.keys(kirk).map(lowercase)
const icons = Object.keys(icon).map(lowercase)

describe('UI Library entry point', () => {
  it('Should render the kirk library', () => {
    expect(components.length).toBeGreaterThan(0)
  })

  it('Should import every component folder', () => {
    expect(components).toEqual([
      'flush',
      'flushToHTML',
      ...getComponentDirectories('src'),
      'branding',
      ...icons,
    ])
  })
})
