import * as React from 'react'
import { Button, Header, Label, Wrapper, Error } from './StylesComps';
import { checkVersion } from './utils';

function CheckVersion() {
    const [version, setVersion] = React.useState('')
    const [error, setError] = React.useState('')
    const [isPending, startTransition] = React.useTransition()

    const handleSubmit = () => {
        startTransition(async () => {
            try{
            const error = await checkVersion(version);
            if (error) {
                setError(error);
                return;
            } else {
                setVersion('Correct Version')
                setError('')
            }}
            catch(e){
                setError(e as string);
            }
            // p.then((s) => {
            //     setName('Correct version')
            // },(reason) => {
            //     setError(reason)
            // })
        })
    }
    return <Wrapper>
        <Header>UseTransition in React 19 using async 
            <br/>type React 19 in the input to test</Header>
        <Label htmlFor={'version'}>Version:</Label>
        <input name={'version'} value={version} onChange={(ev) => setVersion(ev.target.value)} />
        <Button onClick={handleSubmit} disabled={isPending}>Check version</Button>
        {error && <Error>{error}</Error>}
    </Wrapper>
}

export default CheckVersion

