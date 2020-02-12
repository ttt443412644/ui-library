import React from 'react'
import cc from 'classcat'

import { color } from '_utils/branding'
import Text, { TextTagType, TextDisplayType } from 'text'
import ChevronIcon from 'icon/chevronIcon'
import Button from 'button/Button'

export enum ItemStatus {
  DEFAULT = 'default',
  LOADING = 'loading',
  CHECKED = 'checked',
}

export interface ItemProps {
  readonly chevron?: boolean
  readonly className?: Classcat.Class
  readonly href?: string | JSX.Element
  readonly highlighted?: boolean
  readonly isClickable?: boolean
  readonly leftTitle?: string
  readonly leftTitleButtonAddon?: React.ReactElement<Button>
  readonly leftTitleDisplay?: TextDisplayType
  readonly leftTitleColor?: string
  readonly leftBody?: string | React.ReactNode
  readonly leftBodyDisplay?: TextDisplayType
  readonly leftBodyColor?: string
  readonly leftBodyAnnotation?: string | React.ReactNode
  readonly leftBodyAnnotationDisplay?: TextDisplayType
  readonly leftBodyAnnotationColor?: string
  readonly leftAddon?: React.ReactNode
  readonly rightTitle?: string | JSX.Element
  readonly rightTitleDisplay?: TextDisplayType
  readonly rightTitleStrikeThrough?: boolean
  readonly rightTitleAriaLabel?: string
  readonly rightTitleColor?: string
  readonly rightBody?: string | React.ReactNode
  readonly rightBodyDisplay?: TextDisplayType
  readonly rightBodyColor?: string
  readonly rightAddon?: React.ReactNode
  readonly tag?: JSX.Element
  readonly ariaLabel?: string
  readonly onClick?: (event: React.MouseEvent<HTMLElement>) => void
  readonly onBlur?: (event: React.FocusEventHandler<HTMLElement>) => void
  readonly onFocus?: (event: React.FocusEventHandler<HTMLElement>) => void
  readonly onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void
}

const Item = ({
  chevron,
  className,
  href,
  onClick,
  onBlur,
  onFocus,
  onMouseDown,
  highlighted,
  isClickable,
  leftTitle,
  leftTitleButtonAddon,
  rightTitleStrikeThrough,
  rightTitleAriaLabel,
  leftTitleDisplay = TextDisplayType.TITLE,
  leftTitleColor,
  leftBody,
  leftBodyDisplay = TextDisplayType.BODY,
  leftBodyColor,
  leftBodyAnnotation,
  leftBodyAnnotationDisplay,
  leftBodyAnnotationColor,
  leftAddon,
  rightTitle,
  rightTitleDisplay = TextDisplayType.TITLE,
  rightTitleColor,
  rightBody,
  rightBodyDisplay = TextDisplayType.BODY,
  rightBodyColor,
  rightAddon,
  tag = <div />,
  ariaLabel,
}: ItemProps) => {
  let Tag = tag.type
  let tagProps = tag.props
  if (href) {
    if (typeof href !== 'string') {
      Tag = href.type
      tagProps = { ...tagProps, ...href.props }
    } else {
      Tag = 'a'
      tagProps = { href }
    }
  }
  const hasRightText = rightTitle || rightBody

  return (
    <Tag
      {...tagProps}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      className={cc([
        'kirk-item',
        {
          'kirk-item--highlighted': highlighted,
          'kirk-item--clickable': isClickable,
        },
        className,
      ])}
      aria-label={ariaLabel}
    >
      {leftAddon && <div className="kirk-item-leftAddon">{leftAddon}</div>}
      <div className="kirk-item-leftText">
        {leftTitle && (
          <Text
            className={leftTitleButtonAddon ? 'kirk-item-title--withButtonAddon' : null}
            display={leftTitleDisplay}
            textColor={leftTitleColor}
            tag={TextTagType.DIV}
          >
            {leftTitle}
            {/* In case of a clickable Item don't display the addon button */}
            {!href && leftTitleButtonAddon}
          </Text>
        )}
        {leftBody && (
          <Text
            className="kirk-item-body"
            display={leftBodyDisplay}
            textColor={leftBodyColor}
            tag={TextTagType.DIV}
          >
            {leftBody}
          </Text>
        )}
        {leftBodyAnnotation && (
          <Text
            className="kirk-item-body-annotation"
            display={leftBodyAnnotationDisplay}
            textColor={leftBodyAnnotationColor}
            tag={TextTagType.DIV}
          >
            {leftBodyAnnotation}
          </Text>
        )}
      </div>
      {hasRightText && (
        <div className="kirk-item-rightText">
          {rightTitle && (
            <Text
              className={cc([
                'kirk-item-title',
                {
                  'kirk-item--strikethrough': rightTitleStrikeThrough,
                },
              ])}
              display={rightTitleDisplay}
              textColor={rightTitleColor}
              tag={TextTagType.DIV}
              ariaLabel={rightTitleAriaLabel}
            >
              {rightTitle}
            </Text>
          )}
          {rightBody && (
            <Text
              className="kirk-item-body"
              display={rightBodyDisplay}
              textColor={rightBodyColor}
              tag={TextTagType.DIV}
            >
              {rightBody}
            </Text>
          )}
        </div>
      )}
      {rightAddon && <div className="kirk-item-rightAddon">{rightAddon}</div>}
      {chevron && (
        <div className="kirk-item-rightAddon">
          <ChevronIcon iconColor={!isClickable ? color.fadedText : color.secondaryText} />
        </div>
      )}
    </Tag>
  )
}

export default Item
