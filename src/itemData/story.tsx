import React from 'react'

import { storiesOf } from '@storybook/react'
import { boolean, text, withKnobs } from '@storybook/addon-knobs'

import ItemData from './index'

storiesOf('ItemData', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const isMainTitle = boolean('Title', false)
    const isDataInfo = boolean('Secondary info', false)

    return (
      <ItemData
        mainInfo={text('Main info', 'Main information')}
        data={text('Data', 'Data')}
        mainTitle={isMainTitle ? text('Main title', 'Title') : null}
        dataInfo={isDataInfo ? text('Data info', 'Info') : null}
        tag={<li />}
      />
    )
  })
