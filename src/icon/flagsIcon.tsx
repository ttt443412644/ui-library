import React from 'react'
import BaseIcon from '_utils/icon'
import { BaseIconDefaultProps } from '_utils/icon/BaseIcon'

export const FlagsIcon = (props: Icon) => (
  <BaseIcon {...props}>
    <g fill="none">
      <path d="M-2-1h24v24H-2z" />
      <path
        stroke={props.iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.74 5.783h6.086L17.087 11l1.74 5.217H7.521"
      />
      <path
        stroke={props.iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.435 2.304h11.304V12.74H1.435M1.435 1.435v19.13"
      />
    </g>
  </BaseIcon>
)

FlagsIcon.defaultProps = BaseIconDefaultProps

export default React.memo(FlagsIcon)
