import React from 'react'

interface CardProps {
  title: string | JSX.Element
  content: string | JSX.Element
}

export default function Card({ title, content }: CardProps): JSX.Element {

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__title">{title}</div>
      </div>
      <div className="card__body">
        {content}
      </div>
    </div>
  )
}
