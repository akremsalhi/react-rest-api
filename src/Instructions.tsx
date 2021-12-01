
import { List, ListIcon, ListItem } from '@chakra-ui/layout';
import { MdCheckCircle } from "react-icons/md"

export default function Instructions () {
    return (
        <div className="mt-10 grid grid-cols-1 gap-y-3">
        <strong>Important:</strong>
        <List spacing={3}>
            <ListItem className="text-lg">
                <ListIcon as={MdCheckCircle} color="green.500" />
                Catching http errors.
            </ListItem>
            <ListItem className="text-lg">
                <ListIcon as={MdCheckCircle} color="green.500" />
                Show content as the request data is ready.
            </ListItem>
            <ListItem className="text-lg">
                <ListIcon as={MdCheckCircle} color="green.500" />
                Make the Search input as readonly if the data is not ready.
            </ListItem>
        </List>
    </div>
    )
}