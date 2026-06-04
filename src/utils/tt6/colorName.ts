import type { TT6ChallengeCategory } from "../../types/tt6/challenge";
import assertUnreachable from "../assertUnreachable";

export function tt6ColorName(category: TT6ChallengeCategory) {
    switch (category) {
        case "challenge":
            return "green" as const;
        case "find":
            return "purple" as const;
        case "hard":
            return "red" as const;
        default:
            return assertUnreachable(category);
    }
}