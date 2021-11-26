import React from 'react'

interface CardSkeletonProps {
  title: JSX.Element
  content: JSX.Element
}

export default function CardSkeleton({ title, content }: CardSkeletonProps): JSX.Element {

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__title">{title}</div>
      </div>
      <div className="card__body">
        {content}
      </div>
      <div className="card__footer">
        <div className="actions">
        </div>
      </div>
    </div>
  )
}
