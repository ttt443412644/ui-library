import React, { Fragment } from 'react'
import cc from 'classcat'
import isEmpty from 'lodash.isempty'

import Avatar from 'avatar'
import ComfortIcon from 'icon/comfortIcon'
import LightningIcon from 'icon/lightningIcon'
import LadyIcon from 'icon/ladyIcon'
import Itinerary from 'itinerary'
import Item from '_utils/item'
import Text, { TextDisplayType } from 'text'
import { color } from '_utils/branding'

/**
 * Display 5 passengers max.
 * When having more than this number, the last displayed one is replaced by a more counter.
 *
 * Exemples:
 * - 5 passengers or less: we display all of them
 * - 6 passengers: we display 4 passengers and a '+2' bubble
 */
const PASSENGERS_TO_DISPLAY = 5

interface User {
  avatarUrl: string
  firstName: string
}

export interface TripCardProps {
  href: string | JSX.Element
  itinerary: Place[]
  driver?: User
  passengers?: User[]
  price: string
  flags?: {
    ladiesOnly?: boolean
    maxTwo?: boolean
    autoApproval?: boolean
  }
  titles?: {
    ladiesOnly?: string
    maxTwo?: string
    autoApproval?: string
  }
  metaUrl?: string
  highlighted?: string
  className?: Classcat.Class
  statusInformation?: {
    icon: JSX.Element
    text: string
    highlighted?: boolean
  }
  badge?: string
  title?: string
}

const renderPassenger = (passenger: User) => (
  <li className="kirk-tripCard-avatar" key={`${passenger.firstName}-${passenger.avatarUrl}`}>
    <Avatar image={passenger.avatarUrl} isSmall />
  </li>
)

const renderMorePassengers = (count: number) => (
  <li className="kirk-tripCard-avatar kirk-tripCard-passengers-more">
    <Text display={TextDisplayType.BODY} textColor={color.white}>
      +{count}
    </Text>
  </li>
)

const TripCard = ({
  className,
  href,
  itinerary,
  driver,
  passengers = [],
  price,
  flags = {},
  titles = {},
  highlighted = '',
  metaUrl = null,
  statusInformation = null,
  badge = null,
  title = null,
}: TripCardProps) => {
  const departure = itinerary[0]
  const arrival = itinerary[itinerary.length - 1]
  const displayFlags = isEmpty(highlighted) && !isEmpty(flags)
  const itemPropName = `${departure.mainLabel} → ${arrival.mainLabel}`

  let componentTag
  let componentProps = {}

  // If we pass a component to href, we get component type and we merge props
  if (typeof href !== 'string') {
    componentTag = href.type
    componentProps = {
      ...href.props,
      rel: 'nofollow',
    }
  } else {
    componentTag = 'a'
    componentProps = {
      href,
      rel: 'nofollow',
    }
  }

  return (
    <li
      className={cc([
        'kirk-tripCard',
        {
          'kirk-tripCard--highlighted': !!highlighted,
          'kirk-tripCard--with-badge': badge && badge.length,
        },
        className,
      ])}
      itemScope
      itemType="http://schema.org/Event"
    >
      {React.createElement(
        componentTag,
        componentProps,
        <Fragment>
          {metaUrl && (
            <Fragment>
              <meta itemProp="url" content={metaUrl} />
              <meta itemProp="name" content={itemPropName} />
              <meta itemProp="startDate" content={departure.isoDate} />
              <meta itemProp="endDate" content={arrival.isoDate} />
            </Fragment>
          )}

          {badge && (
            <Text className="kirk-tripCard-badge" textColor={color.white}>
              {badge}
            </Text>
          )}

          {statusInformation && (
            <Item
              className="kirk-tripCard-top-item"
              leftAddon={React.cloneElement(statusInformation.icon, {
                iconColor: statusInformation.highlighted ? color.primary : color.icon,
              })}
              leftTitle={statusInformation.text}
              leftTitleDisplay={TextDisplayType.BODY}
              highlighted={statusInformation.highlighted}
            />
          )}

          {title && (
            <Text display={TextDisplayType.SUBHEADERSTRONG} className="kirk-tripCard-title">
              {title}
            </Text>
          )}

          <div className="kirk-tripCard-main">
            <Itinerary className="kirk-tripCard-itinerary" places={itinerary} />
            <Text className="kirk-tripCard-price" display={TextDisplayType.TITLESTRONG}>
              {price}
            </Text>
          </div>
          <div className="kirk-tripCard-bottom">
            {driver && (
              <div className="kirk-tripCard-driver">
                <div className="kirk-tripCard-avatar">
                  <Avatar image={driver.avatarUrl} />
                </div>
                <Text display={TextDisplayType.TITLE}>{driver.firstName}</Text>
              </div>
            )}
            {passengers && (
              <ul className="kirk-tripCard-passengers">
                {passengers.length > PASSENGERS_TO_DISPLAY &&
                  renderMorePassengers(passengers.length - PASSENGERS_TO_DISPLAY + 1)}
                {passengers.length === PASSENGERS_TO_DISPLAY &&
                  renderPassenger(passengers[PASSENGERS_TO_DISPLAY - 1])}
                {passengers
                  .slice(0, PASSENGERS_TO_DISPLAY - 1)
                  .reverse()
                  .map(renderPassenger)}
              </ul>
            )}
            {highlighted && (
              <Text className="kirk-tripCard-topText" display={TextDisplayType.TITLESTRONG}>
                {highlighted}
              </Text>
            )}
            {displayFlags && (
              <div className="kirk-tripCard-flags">
                {flags.ladiesOnly && <LadyIcon title={titles.ladiesOnly || ''} />}
                {flags.maxTwo && <ComfortIcon title={titles.maxTwo || ''} />}
                {flags.autoApproval && <LightningIcon title={titles.autoApproval || ''} />}
              </div>
            )}
          </div>
        </Fragment>,
      )}
    </li>
  )
}

export default TripCard
