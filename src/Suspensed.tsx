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
const Suspensed = () => {
    const waitedFetch = (): Promise<Genre[]> => {
        return new Promise<Genre[]>(
            (resolve) => {
                setTimeout(async () => {
                    const r = await fetch('./genre.json')
                    const data = await r.json()
                    resolve(data)
                }, 5000)
            }
        )
    }

    const Loader = () => {
        const [s, setS] = React.useState<React.CSSProperties>({
            height: '240px',
            backgroundColor: '#fff',
            fontSize: '12px',
            transitionProperty: 'background-color, font-size, transform, color',
            transitionTimingFunction: 'ease-in-out',
            transitionDuration: '5s'
        })
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

        return (
            <div style={s}>Loading ...</div>);
    }

    const getInner = async () => {
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
    return <Suspense fallback={<Loader />}>
        {getInner()}
    </ Suspense>
}

export default Suspensed