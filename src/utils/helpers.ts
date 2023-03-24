export const assertCannotReach = (x: never) => {
    throw Error("Unreachable Line of code detected" + x);
};
