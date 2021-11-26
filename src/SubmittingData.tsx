
import { Icon } from "@chakra-ui/react"
import { FiSend } from "react-icons/fi"
import { Button } from '@chakra-ui/button'
import FormInput from "./UI/Components/Forms/FormInput"
import FormCard from "./FormCard"
import FetchForm from "./shared/Form/FetchForm"

export default function SubmittingData () {

    return (
        <div className="grid grid-cols-1 gap-y-2">
            <div className="grid grid-cols-2 justify-between">
                <h1 className="text-2xl">Submitting data</h1>
            </div>
            <div className="grid grid-cols-1 justify-between">
                <FetchForm action="https://reqres.in/api/register">
                    <FormCard>
                        <div className="grid grid-cols-2 justify-between items-center gap-x-2">
                            <FormInput id="email" name="email" type="email">Your E-mail</FormInput>
                            <FormInput id="password" name="password" type="password">Your password</FormInput>
                            
                        </div>
                        <Button type="submit" rightIcon={<Icon as={FiSend} />} className="w-60 mt-2">
                            Submit
                        </Button>
                    </FormCard>
                </FetchForm>
            </div>
        </div>
    )
}