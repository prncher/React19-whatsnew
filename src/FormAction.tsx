import React from "react"
import { Form, Button, Header, Label, Wrapper, Error } from './StylesComps';
import { checkVersion } from './utils';

/*
    export function useActionState<State, Payload>(
        action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
        initialState: Awaited<State>,
        permalink?: string,
    ): [state: Awaited<State>, dispatch: (payload: Payload) => void, isPending: boolean];

*/

const CheckVersionWithForm = () => {
    const [error, submitAction, isPending] = React.useActionState(
        async (action: any, formData: FormData) => {
            try{
                const error = await checkVersion(formData.get('version') as string);
                if (error) {
                    return error;
                } else {
                    return 'Correct Version'
                }}
                catch(e){
                    return e as string
                }            
        },
        null,
    );

    return <Form action={submitAction}>
        <Header>useActionState in React 19 using async 
            <br/>type React 19 in the input to test</Header>
        <Label htmlFor={'version'}>Version:</Label>
        <input name={'version'} type="text" />
        <Button type="submit" disabled={isPending}>Check version</Button>
        {error && <Error>{error}</Error>}
    </Form>
}

export default CheckVersionWithForm