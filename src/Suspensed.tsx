/**
 * Copyright (C) 2024-present Prince Cheruvathur
 * 
 * This program is free software: you can redistribute it 
 * and/or modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version. 
 *
 */
import { Suspense } from "react"
import { Table } from "./StylesComps";
import React from "react";
interface Genre {
    genre: string;
    studentCount: number;
}

const divStyle = {
    height: '240px',
    backgroundColor: '#fff',
    fontSize: '12px',
    transitionProperty: 'background-color, font-size, transform, color',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: '5s'
}

const Loader = () => {
    const [s, setS] = React.useState<React.CSSProperties>(divStyle)
    React.useEffect(() => {
        setTimeout(() => {
            setS({
                opacity: 0.1,
                backgroundColor: '#000',
                color: '#010',
                fontSize: '24px',
                transitionProperty: 'opacity, background-color, font-size, color',
                transitionTimingFunction: 'ease-in-out',
                transitionDelay: '0.5s',
                transitionDuration: '5s',
                height: '240px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            })
        }, 100)
    }, [])

    return (<div style={s}>Loading ...</div>);
}

const Suspensed = () => {
    const waitedFetch = (): Promise<Genre[]> => {
        return new Promise<Genre[]>(
            (resolve, reject) => {
                setTimeout(async () => {
                    try {
                        const r = await fetch('./genre.json', {
                            mode: 'cors',
                            cache: 'force-cache'
                        })
                        console.log(r.statusText)
                        const data = await r.json();
                        resolve(data)
                    } catch (e) {
                        reject(e)
                    }
                }, 5000)
            }
        )
    }

    const getInner = async () => {
        try {
            const data = await waitedFetch()
            return <Table>
                <thead>
                    <tr>
                        <th>Genre</th>
                        <th>Students Count</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d: Genre, i: number) => <tr key={i}>
                        <td>{d.genre}</td>
                        <td>{d.studentCount}</td>
                    </tr>
                    )}</tbody>
            </Table>
        }
        catch(e) {
            return <div style={divStyle}>{`Error fetching data ${e}`}</div>
        }
    }
    return <Suspense fallback={<Loader />}>
        {getInner()}
    </ Suspense>
}

export default Suspensed