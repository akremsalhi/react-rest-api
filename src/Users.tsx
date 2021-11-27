import { SlideFade } from '@chakra-ui/transition'
import Card from './UI/Components/Card'

interface UsersProps {
    users: any[]
}

export default function Users({ users }: UsersProps) {
    return (
        <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {users.map((user, index) => <SlideFade key={index} in offsetX="-20px" transition={{ enter: { duration: 0.09 * index }}}>
                <Card title={user.name} content={user.address.street} />
            </SlideFade>)}
        </div>
    )
}