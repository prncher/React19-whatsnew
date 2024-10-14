import { useFormStatus } from "react-dom"
import { Button, Form, Header } from "./StylesComps"
import React from "react"

const SubmitButton = () => {
    const { pending, data } = useFormStatus()
    return <><Button type="submit" disabled={pending}>Fetch</Button>
        <br />
        {<p>{data ? `Requesting ${data?.get("fileName")}...` : ''}</p>}
    </>
}

const FormStatus = () => {
    const [data, setData] = React.useState([])
    return <Form action={async (formData: FormData) => {
        return new Promise(async (resolve, reject) => {
            try {
                setTimeout(async () => {
                    if (formData.get('fileName') === 'genre.json') {
                        const r = await fetch(`./genre.json`, {
                            mode: 'cors',
                            cache: 'force-cache'
                        })

                        const data = await r.json();
                        setData(data)
                        resolve(data)
                    } else {
                        setData([])
                        resolve()
                    }
                }, 5000)
            } catch (e) {
                reject(e)
            }
        })
    }}>
        <Header>useFormStatus in React 19.
            <br />type genre.json in the input to fetch data</Header>
        <input name={'fileName'} type="text" />
        <SubmitButton />
        <p>
            {data.map((d: {
                genre: string;
                studentCount: number;
            }, i: number) => <div key={i}>
                    <span>{d.genre} : {d.studentCount}</span>
                </div>
            )}
        </p>
    </Form>
}

export default FormStatus