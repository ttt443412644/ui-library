import styled from 'styled-components'
import css from 'styled-jsx/css'
import { color, font } from '_utils/branding'
import Caption from './Caption'

const StyledCaption = styled(Caption)`
  & {
    font-size: ${font.s.size};
    line-height: ${font.s.lineHeight};
    color: ${color.secondaryText};
  }
  .kirk-link {
    font-size: ${font.s.size};
    line-height: ${font.s.lineHeight};
    color: ${color.secondaryText};
  }
`

export default StyledCaption