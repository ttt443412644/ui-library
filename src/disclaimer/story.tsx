import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import spec from 'disclaimer/specifications/disclaimer.md'
import Disclaimer from 'disclaimer'
import Button, { ButtonStatus } from 'button'

const stories = storiesOf('Disclaimer', module)
stories.addDecorator(withKnobs)

stories.add('Specifications',
    () => (<Disclaimer useInfoIcon>
        My disclaimer text here
    </Disclaimer>), {readme: spec})

stories.add('With info icon', () => (
    <div>
        <Disclaimer useInfoIcon>
            <span>Some short disclaimer and&nbsp;
                <Button status={ButtonStatus.UNSTYLED} href="#">link</Button></span>
        </Disclaimer>

        <Disclaimer useInfoIcon >Some short text disclaimer</Disclaimer>
    </div>


))

const longDisclaimer = 'Some long disclaimer text'.repeat(10)
stories.add('Without info icon', () => (
    <div>
        <Disclaimer useInfoIcon={false} >Some short text disclaimer</Disclaimer>
        <Disclaimer useInfoIcon={false} >
            {longDisclaimer}
        </Disclaimer>
    </div>
))