export const checkVersion = (version: string): Promise<string | undefined> => {
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