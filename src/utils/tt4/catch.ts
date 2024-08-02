const COOLDOWN = 10 * 1000 * 60; // 10 min

export function canTt4TeamBeCaught(catchTimes: number[]): boolean {
	return (
		catchTimes.length === 0 || catchTimes[catchTimes.length - 1] + COOLDOWN < new Date().getTime()
	);
}

export function remainingSafeTimeTt4(catchTimes: number[]): number {
	return catchTimes[catchTimes.length - 1] + COOLDOWN - new Date().getTime();
}
