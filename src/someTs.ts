export const func1 = (arg111: number): string => {
    return arg111.toString();
}

export const func2 = (arg222: number): void => {
    console.log(func1(arg222))
}

const var1: string = func1(1234567);
console.log('вызвали функцию внутри TS',var1)
