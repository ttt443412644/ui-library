import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, select } from '@storybook/addon-knobs'

import Title from './index'

const optionHeading = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
}

storiesOf('Title', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <Title headingLevel={select('Heading', optionHeading, '1')}>
      {text('Title', 'Voice title')}
    </Title>
  ))
