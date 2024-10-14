import React, { useOptimistic } from "react";
import { Button, Form, ListItem } from "./StylesComps"

interface LocalTime {
    text: string;
    fetching: boolean;
}

const waitedTime = (): Promise<string> => {
 //   await new Promise((r) => setTimeout(r, 3000));
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(new Date().toLocaleTimeString())
        },3000)
    })
}

const OptimisticState = () => {
    const [time, setTime] = React.useState<LocalTime>(
        { text: new Date().toLocaleTimeString(), fetching: false }
    );
    const [optimisticTime, updateTime] = useOptimistic(
        time,
        (state: LocalTime, newTime: string) => { 
            return { text: newTime, fetching: true }
         });

    async function getTime() {
        const newTime = await waitedTime();
        setTime((t: LocalTime) => { 
            return { text: newTime, fetching: false } 
        });
    }

    async function getNewTime() {
        updateTime(time.text);
        await getTime();
    }

    return <>
        <Form action={getNewTime}>
            <ListItem>{optimisticTime.text}
                {optimisticTime.fetching && 
                <span style={{color:'red'}}> (Update in progress...)</span>}
            </ListItem>
            <Button type='submit' disabled={optimisticTime.fetching}>Get New Time</Button>
        </Form>
    </>
}

export default OptimisticState