import styled from 'styled-components'
import css from 'styled-jsx/css'
import { color, font, space } from '_utils/branding'
import Stepper from './Stepper'

const StyledStepper = styled(Stepper)`
  & {
    display: flex;
  }

  & label {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  & .kirk-stepper-value {
    display: inline;
    padding: 0 ${space.l};
    margin: 0;
    border: none;
    color: ${color.primaryText};
    font-size: ${font.l.size};
    text-align: center;
    flex-grow: 1;
    align-self: center;
  }

  & div .kirk-stepper-decrement,
  & div .kirk-stepper-increment {
    min-width: 24px;
  }
`

export default StyledStepper
