import React from 'react'
import cc from 'classcat'

import prefix from '_utils'

import Caption from 'caption'

export interface MessageProps {
  readonly children: string
  readonly isoDate?: string
  readonly date?: string
  readonly secondaryLink?: string
  readonly secondaryText?: string
  readonly active?: boolean
  readonly author?: string | JSX.Element
  readonly className?: Classcat.Class
  readonly extraClassName?: Classcat.Class
}

const Message = ({
  active,
  author,
  date,
  isoDate,
  secondaryLink,
  secondaryText,
  children,
  className,
  extraClassName,
}: MessageProps) => (
  <blockquote className={cc(['kirk-message', prefix({ active }), className, extraClassName])}>
    {author && <cite>{author}</cite>}
    <div className="kirk-label">
      <p>{children}</p>
      <Caption href={secondaryLink} secondaryText={secondaryText} isoDate={isoDate}>
        {date}
      </Caption>
    </div>
  </blockquote>
)

export default Message