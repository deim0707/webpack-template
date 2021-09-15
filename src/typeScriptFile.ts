export const func1 = (arg: number): string => {
    return arg.toString();
}

const var1: string = func1(1234567);

console.log('вызвали функцию внутри TS',var1)