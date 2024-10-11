import * as React from 'react'
import styled from 'styled-components';

const checkVersion = (version: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (version === 'React 19') {
                resolve(undefined);
            } else {
                reject('Wrong version')
            }
        }, 2000)
    })
}

const Wrapper = styled.section`
  padding: 4em;
  background: #141a20;
`;

const Header = styled.h3`
color:white
`
const Error = styled.p`
color: red
`
const Label = styled.label`
color:#0f0;
padding: 0.25em 1em;
`
const Button = styled.button`
  background: #BF4F74;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #f00;
  border-radius: 3px;
`;


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

