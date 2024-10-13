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
import { Comment, Page } from "./UseApi"

interface CommentsArgs {
    comments: Comment[];
}
const CommentsContext = React.createContext<CommentsArgs>({comments:[]})

const CommentsProvider = (p:{ children:React.ReactElement }) => {
    const [comments, setComments] = React.useState<Comment[]>([])
    React.useEffect(() => {
        setTimeout(() => {
            const temp: Comment[] = Array(10).fill({id:0,comment:''})
            setComments(temp.map((c,i) => { return {
                id: i, comment: `Comment:  ${i}`
            }}))
        }, 3000)
    },[])
    
    return <CommentsContext.Provider value={{comments}}>
        {p.children}
    </CommentsContext.Provider>
}

const UsableComments = () => {
    const {comments} = React.useContext(CommentsContext)

    return new Promise<Comment[]>((resolve) => {
        resolve(comments)
    })
}

const CommentsSection = () => {
    return <CommentsProvider>
        <Page />
    </CommentsProvider>
}

export { CommentsSection, CommentsContext, UsableComments}