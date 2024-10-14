# This is a React 19 App using the release candidate

This project is not bootstrapped with [Create React App].
Goal of this project is to show the new features of React 19. react-scripts package is locally copied and changed the react version to make use of the build and start scripts.

### Important: styled-components are not available with React 19.
So install using --force. This is tested on Safari, Chrome and FF. 

## Available Scripts

In the project directory, you can run:

### `npm run build`

Build the project

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### npm run prod
Run the app in the production environment. Run build before this.

Here are some details about the code that appears in this repository

![image](https://github.com/prncher/React19-whatsnew/blob/master/Images/React19RC.png)

# React 19 - What's new

## React 19 RC — Preparing to use the new additions.

While exploring the React 19 Release Candidate and familiarizing myself with its new features, I encountered several challenges. Following the official upgrade documentation and utilizing Codemods did not effectively facilitate my experimentation with the new additions, making it difficult to write code and debug effectively. I suspect many others have experienced similar difficulties during this transition.

In response to these challenges, I decided to create a development environment akin to Create React App (CRA) specifically for React 19 RC. I am sharing my code via my GitHub repository, the link to which will be provided at the end of this post. Currently, I have implemented changes for the client side, with server-side modifications planned for a later date.

I have added react-scripts code from a folder as a dependency so that I could use the build and start scripts similar to a CRA app. I did some modification of the react and react-dom versions inside the package.json of the react-scripts. If you are cloning the code from my GitHub, you will have to install using "--force" to get the packages since some peer dependency checks are broken.

 ```
 "@types/react": "npm:types-react@19.0.0-rc.0",
    "@types/react-dom": "npm:types-react-dom@19.0.0-rc.0",
    "react": "^19.0.0-rc-70fb1363-20241010",
    "react-dom": "^19.0.0-rc-70fb1363-20241010",
```

styled-components is another package looking for older react dependencies and "--force" overcome the dependency mismatch errors. All the code samples are written in typescript.

Here are the additions and changes in React 19 RC that I have provided code samples.

[useTransition](https://react.dev/reference/react/useTransition)

useTransition was available even before React 19 RC. What is changed in 19 RC is the return type of the Transition. See below.

```export type TransitionFunction = () => VoidOrUndefinedOnly | Promise<VoidOrUndefinedOnly>;```

The Promise allows the transition function to be asynchronous so that the isPending return value from useTransition to be true until the function returns.

```
 const [isPending, startTransition] = React.useTransition()

    const handleClick = () => {
        startTransition(async () => {
            try {
                const error = await checkVersion(version);
                if (error) {
                    setError(error);
                    return;
                } else {
                    setVersion('Correct Version')
                    setError('')
                }
            }
            catch (e) {
                setError(e as string);
            }
```
Here the checkVersion is an async function taking some time to return. During that time, isPending continue to be true. 

```
<Header>UseTransition in React 19 using async
                <br />type React 19 in the input to test</Header>
            <Label htmlFor={'version'}>Version:</Label>
            <input name={'version'} value={version} onChange={(ev) => setVersion(ev.target.value)} />
            <Button onClick={handleClick} disabled={isPending}>Check version</Button>
            {error && <Error>{error}</Error>}
```
see the image of useTransition demo below. The button "Check Version" is disabled because of the pending state of the transition.

![image](https://github.com/prncher/React19-whatsnew/blob/master/Images/useTransition.png)

[useActionState](https://react.dev/reference/react/useActionState)

useActionState is new in React 19 RC. This hook allows an asynchronous function to be called in a form so that the pending state of the transition can be known and the state that is returned from the dispatch function. See the useActionState signatures below.

```
 export function useActionState<State>(
        action: (state: Awaited<State>) => State | Promise<State>,
        initialState: Awaited<State>,
        permalink?: string,
    ): [state: Awaited<State>, dispatch: () => void, isPending: boolean];
    export function useActionState<State, Payload>(
        action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
        initialState: Awaited<State>,
        permalink?: string,
    ): [state: Awaited<State>, dispatch: (payload: Payload) => void, isPending: boolean];
```
I am returning error from the dispatch along with the isPending provided by the useActionState.

```
const [error, submitAction, isPending] = React.useActionState(
        async (action: any,
            formData: FormData) => {
            try {
                const error = await checkVersion(formData.get('version') as string);
                if (error) {
                    return error;
                } else {
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
```

 useActionState is not providing any means of changing the FormData state. So I am using a ref to one of the field in the form that I want to change so that I can have a demo similar to the useTransition above.


```
<Form action={submitAction}>
            <Header>UseActionState in React 19 using async
                <br />type React 19 in the input to test</Header>
            <Label htmlFor={'version'}>Version:</Label>
            <input name={'version'} type="text" ref={inputRef} />
            <Button type="submit" disabled={isPending}>Check version</Button>
            {error && <Error>{error}</Error>}
        </Form>
```
Image of the useActionState demo is below. The "Check Version" button is disabled when isPending state returned from useActionState is true.

![image](https://github.com/prncher/React19-whatsnew/blob/master/Images/useActionState.png)

[useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)

useFormStatus is a new hook added in react-dom. A child component inside a form can get the action pending status of the parent form by using the useFormStatus hook along with any field values of the form.

```
const SubmitButton = () => {
    const { pending, data } = useFormStatus()
    return <><Button type="submit" disabled={pending}>Fetch</Button>
        <br />
        {<p>{data ? `Requesting ${data?.get("fileName")}...` : ''}</p>}
    </>
}
```
I am using the SubmitButton as a child component which gets the string value of the input named "fileName" and the pending status of the asynchronous submit action handler.

```
<Form action={async (formData: FormData) => {
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
```
useFormStatus demo page image is below. The button is disabled during the pending state of the action handler.

![image](https://github.com/prncher/React19-whatsnew/blob/master/Images/useFormStatus.png)

[useOptimistic](https://react.dev/reference/react/useOptimistic)

useOptimistic allows the status of an ongoing action until the action is completed. There are multiple states for the optimistic data which can be used to provide a visual cue to the viewer to indicate the progress.


```
<Form action={getNewTime}>
            <ListItem>{optimisticTime.text}
                {optimisticTime.fetching && 
                <span style={{color:'red'}}> (Update in progress...)</span>}
            </ListItem>
            <Button type='submit' disabled={optimisticTime.fetching}>Get New Time</Button>
        </Form>
```
I have added a flag to indicate the action is in progress. useOptimistic returns the new time after the asynchronous action is completed.

```
const [optimisticTime, updateTime] = useOptimistic(
        time,
        (state: LocalTime, newTime: string) => { 
            return { text: newTime, fetching: true }
         });
```
The first parameter time is the passthrough which is returned when no action is pending. See the signature of the useOptimistic below.

```
export function useOptimistic<State>(
        passthrough: State,
    ): [State, (action: State | ((pendingState: State) => State)) => void];
    export function useOptimistic<State, Action>(
        passthrough: State,
        reducer: (state: State, action: Action) => State,
    ): [State, (action: Action) => void]; 
```
The second parameter is the reducer which merges the new state and returns.

```
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
```
Below is the useOptimistic demo in a pending state. Once the action returns, new time is updated in the optimisticTime.

![image](https://github.com/prncher/React19-whatsnew/blob/master/Images/useOptimistic.png)

[use](https://react.dev/reference/react/use)

use is a new API in React 19 RC. This is not called a hook probably because it need not be used at the top level of a component. use API can be used conditionally and inside a function taking a context. That way useContext is not needed even though a provider is used to update the state.

```
const Page = () => {
    const getComments = (): Comment[] => {
    // Alowed use of "use" inside a function, not top level like
        // other hooks - see useContext.
        const { comments } = React.use(CommentsContext)
        return comments
    }
    return <CommentsComp comments={getComments()} />
}
```
In the above code, I am using a function getComments to illustrate the use of use inside a function and not at the Page component level.

```
const CommentsSection = () => {
    return <CommentsProvider>
        <Page />
    </CommentsProvider>
}
```
The Page component is a child of the provider so that any state change in the context is reflected in the Page.

```
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
```
See the signature of the use API below.

```
export type Usable<T> = PromiseLike<T> | Context<T>;

    export function use<T>(usable: Usable<T>): T;
```
See the useAPI demo image after the promise got resolved for creating the comments.

![image](https://github.com/prncher/React19-whatsnew/blob/master/Images/useApi.png)

[Suspense](https://react.dev/reference/react/Suspense#suspense)

 It's important to note that this feature is not new to React 19 RC; it has been available since React 18. I included this example to demonstrate how the Suspense loading feature can be implemented entirely on the client side by utilizing await to delay the rendering of a child component within Suspense.

```
return <Suspense fallback={<Loader />}>
        {getInner()}
    </ Suspense>
```
Here getInner is providing the child after an await on another call so that there is a delay in which the Loader component is shown.
```
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
```
Table component is returned only when waitedFetch provides the data or an exception is thrown from waitedFetch, which will return a div. See waitedFetch below.
```
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
```
See the Loader in action below.
![image](https://github.com/prncher/React19-whatsnew/blob/master/Images/Loader.png)
