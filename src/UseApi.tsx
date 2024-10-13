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
import { CommentsContext } from "./CommentsContext";
import { Header, ListItem, Wrapper } from "./StylesComps";

interface Comment {
    id: number;
    comment: string;
}

const CommentsComp = (props: { comments: Comment[] }) => {
    const { comments } = props
    return <Wrapper color={'#042210'}>
        <Header>Use Hook in React 19. Wait for the promise to get resolved</Header>
        {Array.isArray(comments) && comments.length > 0 ?
            comments.map(c => 
            <ListItem key={c.id}>{c.comment}</ListItem>) :
            <ListItem>No Comments</ListItem>}
    </Wrapper>
}

const Page = () => {
    const getComments = (): Comment[] => {
        // Alowed use of "use" inside a function, not top level like
        // other hooks - see useContext.
        const { comments } = React.use(CommentsContext)
        return comments
    }
    return <CommentsComp comments={getComments()} />
}

export { Page };
export type { Comment };
