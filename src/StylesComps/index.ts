/**
 * Copyright (C) 2024-present Prince Cheruvathur
 * 
 * This program is free software: you can redistribute it 
 * and/or modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version. 
 *
 */
import styled from "styled-components";

export const Wrapper = styled.section<{color:string}>`
padding: 4em;
background: ${(props) => props.color || 'white'};
`;

export const Header = styled.h3`
color:white
`
export const Error = styled.p`
color: red
`
export const Para = styled.p`
color: white;
background: #564534;
`

export const Label = styled.label`
color:#0f0;
padding: 0.25em 1em;
`
export const Button = styled.button`
pointer-events:${(props)=>props.disabled?'none':null};
background: ${(props)=>props.disabled?'#BF4F32':'#BF4F74'};
color: white;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid ${(props)=>props.disabled?'#555':'#888'};
border-radius: 3px;
`;

export const DemoButton = styled.button`
background: #999;
color: white;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border-radius: 3px;
`;

export const Form = styled.form`
padding: 4em;
background: #454545;
`;

export const Table = styled.table`
    margin: auto;
    border: none;
    padding: 5px;
    background: #999;
    td, th {
        border: none;
        margin: 2px;
        padding: 3px 20px;
    },
    tbody {
        background: #ccc;
        :hover {
            background: #9ff
        }
    }

    thead {
        background: #999;
        :hover {
            background: #900
        }
    }

`
export const ListItem = styled.li`
    color: white;
    list-style-type: none;
    padding: 0 10px;
    font-size: 12px;
`

