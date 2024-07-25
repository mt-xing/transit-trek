export default function assertUnreachable(x: never): never {
	throw new Error(`Unreachable code reached: ${x}`);
}
