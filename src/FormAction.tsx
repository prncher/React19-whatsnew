/**
 * Copyright (C) 2024-present Prince Cheruvathur
 * 
 * This program is free software: you can redistribute it 
 * and/or modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version. 
 *
 */
import React from "react"
import { Form, Button, Header, Label, Error } from './StylesComps';
import { checkVersion } from './utils';

const CheckVersionWithForm = () => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    const [error, submitAction, isPending] = React.useActionState(
        async (action: any,
            formData: FormData) => {
            try {
                const error = await checkVersion(formData.get('version') as string);
                if (error) {
                    return error;
                } else {
                    // This is a hack for now.
                    inputRef && inputRef.current?.setAttribute('value', 'Correct Version');
                    return
                }
            }
            catch (e) {
                return e as string
            }
        },
        null,
        ''
    );

    return <section style={{
        opacity: isPending ? 0.3 : 1
    }}><Form action={submitAction}>
            <Header>UseActionState in React 19 using async
                <br />type React 19 in the input to test</Header>
            <Label htmlFor={'version'}>Version:</Label>
            <input name={'version'} type="text" ref={inputRef} />
            <Button type="submit" disabled={isPending}>Check version</Button>
            {error && <Error>{error}</Error>}
        </Form>
    </section>
}

export default CheckVersionWithForm