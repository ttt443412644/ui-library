import React from 'react'
import cc from 'classcat'

import { prefix } from '~/_utils/helpers'
import { ButtonProps } from '~/button'
import style from './style'

export interface ButtonGroupProps {
  readonly children: React.ReactElement<ButtonProps>[] | React.ReactElement<ButtonProps>
  readonly className?: Classcat.Class
  readonly isInline?: boolean
  readonly isReverse?: boolean
}

const [BASE_CLASSNAME] = prefix({ 'button-group': true })

const ButtonGroup = ({
  children,
  className = '',
  isInline = false,
  isReverse = false,
}: ButtonGroupProps) => {
  const classNames = [
    BASE_CLASSNAME,
    className,
    prefix(
      {
        row: isInline,
        column: !isInline,
        reverse: isReverse,
      },
      BASE_CLASSNAME,
    ),
  ]
  return (
    <div className={cc(classNames)}>
      {children}
      <style jsx>{style}</style>
    </div>
  )
}

export default ButtonGroup
