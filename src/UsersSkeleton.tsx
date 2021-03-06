import React from 'react'
import { Skeleton } from '@chakra-ui/skeleton'
import Card from './UI/Components/Card'

interface UsersSkeletonProps {
    count: number
}

export default function UsersSkeleton({ count }: UsersSkeletonProps): JSX.Element {
    return (
        <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {Array.from(Array(count).keys())
                .map((_, index) => <Card
                    key={index}
                    title={<Skeleton size="12px" height="10px" width="150px" />}
                    content={<Skeleton size="12px" height="10px" />}
                />
            )}
        </div>
    )
}