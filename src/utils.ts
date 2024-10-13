/**
 * Copyright (C) 2024-present Prince Cheruvathur
 * 
 * This program is free software: you can redistribute it 
 * and/or modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version. 
 *
 */
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