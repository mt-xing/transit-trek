export default function processTt6MathSupplement(
    input: string,
    teamNum: number,
): string {
    const a = Math.pow(7, teamNum) % 5 + 1;
    const b = (teamNum % 2) + 2;
    return input.replaceAll("a^b", `${Math.pow(a, b)}`).replaceAll(
        " a ",
        `${a}`,
    )
        .replaceAll(" b ", `${b}`);
}
