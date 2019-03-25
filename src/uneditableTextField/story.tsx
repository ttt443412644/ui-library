import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import IconSearch from '~/icon/searchIcon'
import UneditableTextField from './index'

const stories = storiesOf('UneditableTextField', module)
stories.addDecorator(withKnobs)

stories.add('Basic', () => (
  <UneditableTextField ellipsis={boolean('ellipsis', true)}>
    {text('label', "I'm a very long text so I should be cut off at the end of the line")}
  </UneditableTextField>
))

stories.add('With icon', () => (
  <UneditableTextField addOn={<IconSearch />} ellipsis={boolean('ellipsis', true)}>
    {text('label', 'Label')}
  </UneditableTextField>
))

stories.add('With simple link/anchor', () => (
  <UneditableTextField href="#foo">Simple anchor</UneditableTextField>
))

stories.add('With component link/anchor', () => (
  <UneditableTextField href={<a href="#bar" />}>Simple anchor</UneditableTextField>
))
