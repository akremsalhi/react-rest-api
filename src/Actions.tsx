import { Button } from "@chakra-ui/button";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { MouseEventHandler } from "react";

interface InstructionsProps {
    updateState: MouseEventHandler<HTMLButtonElement>,
    updateWithError: MouseEventHandler<HTMLButtonElement>,
    reloadError: boolean
}

export default function Actions({ updateState, updateWithError, reloadError }: InstructionsProps) {
    return (
        <div className="grid justify-between items-center lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 sm:gap-y-1">
            <h1 className="text-2xl">Example REST API usage with <strong>React</strong></h1>

            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 sm:gap-y-2 xs:grid-cols-1 xs:gap-y-2 justify-between items-center gap-x-2">

                <Button rightIcon={<RepeatClockIcon />} onClick={updateState}>
                    Reload data
                </Button>
                <Button colorScheme={reloadError ? 'green' : 'red'} onClick={updateWithError}>
                    Try with {reloadError ? 'Success' : 'Error'}
                </Button>
            </div>

        </div>
    )
}