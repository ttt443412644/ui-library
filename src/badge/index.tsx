import React from 'react'
import cc from 'classcat'
import isEmpty from 'lodash.isempty'

import style from './style'

interface BadgeProps {
  readonly className?: Classcat.Class
  readonly children: string | JSX.Element | number
  readonly ariaLabel?: string
}

const Badge = ({ className, children, ariaLabel }: BadgeProps) => (
  <div className={cc(['kirk-badge', className])} aria-label={ariaLabel}>
    <span aria-hidden={!!ariaLabel}>{children}</span>
    <style jsx>{style}</style>
  </div>
)

export default Badge
