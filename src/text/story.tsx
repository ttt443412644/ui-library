import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { selectV2, text, withKnobs, boolean } from '@storybook/addon-knobs'

import { color } from '_utils/branding'
import Text, { TextTagType, TextDisplayType } from 'text'

const stories = storiesOf('Text', module)
stories.addDecorator(withKnobs)

stories.add(
  'basic',
  withInfo('')(() => (
    <Text
      display={selectV2('Display', TextDisplayType, TextDisplayType.BODY)}
      tag={selectV2('Tag', TextTagType, TextTagType.SPAN)}
      textColor={selectV2('Color', color, 'primary')}
      newlineToBr={boolean('newlineToBr', true)}
    >
      {text('Text', 'This is an example')}
    </Text>
  )),
)