import React from 'react'
import cc from 'classcat'

import Stars from '~/stars'
import style from './style'

interface Rating {
  score: number
  ratings: number
  children: string
  className?: Classcat.Class
}

const Rating = ({ score, ratings, children, className = '' }: Rating): JSX.Element => (
  <div className={cc(['kirk-rating', className])}>
    <Stars stars={score} />
    <span>
      {ratings} {children}
    </span>
    <style>{style}</style>
  </div>
)

export default Rating
