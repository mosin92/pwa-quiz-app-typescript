export const ArrayShuffle = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);
