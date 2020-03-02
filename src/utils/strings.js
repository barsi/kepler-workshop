export function generateHashId(count) {
    return Math.random()
        .toString(36)
        .substr(count);
}
