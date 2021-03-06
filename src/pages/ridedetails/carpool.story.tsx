import React, { Fragment } from 'react'

import { storiesOf } from '@storybook/react'
import Section from 'layout/section/baseSection'
import TheVoice from 'theVoice'
import Itinerary from 'itinerary'
import ItemData from 'itemData'
import Divider from 'divider'
import Avatar from 'avatar'
import ItemChoice from 'itemChoice'
import ItemAction from 'itemAction'
import ItemInfo from 'itemInfo'
import { PetIcon, SmokeIcon, BubbleIcon } from 'icon'
import SubHeader from 'subHeader'

const stories = storiesOf('Pages|Ride details/Carpool', module)

stories.add('Default', () => (
  <Fragment>
    <Section>
      <TheVoice>Ven. 11 octobre</TheVoice>
      <Itinerary
        fromAddon="Paris"
        toAddon="Marseille"
        places={[
          {
            mainLabel: 'Paris',
            isoDate: '2017-12-11T09:00',
            time: '09:00',
            href: '#',
          },
          {
            mainLabel: 'Marseille',
            isoDate: '2017-12-11T12:00',
            time: '17:00',
          },
        ]}
        small={false}
      />
      <ItemData data="17,50 €" dataInfo="Par place" mainInfo="3 places restantes" />
      <Divider />
      <ItemChoice label="Vince" rightAddon={<Avatar />} href="#" />
      <ItemAction action="Contacter Vince" leftAddon={<BubbleIcon />} href="#" />
      <Divider />
      <ul>
        <ItemInfo mainInfo="Fumer nest pas autporisé dans la voiture." icon={<SmokeIcon />} />
        <ItemInfo mainInfo="Pas d'animaux dans la voiture." icon={<PetIcon />} />
      </ul>
      <Divider />
      <SubHeader>Passagers</SubHeader>
      <ul>
        <ItemChoice label="Jessica" labelInfo="Paris - Rennes" rightAddon={<Avatar />} href="#" />
        <ItemChoice label="Joe" labelInfo="Paris - Lyon" rightAddon={<Avatar />} href="#" />
      </ul>
      <Divider />
      <ItemAction action="Signaler ce trajet" href="#" />
    </Section>
  </Fragment>
))
