export function getColor(teamNum: number) {
    switch (teamNum) {
        case 1:
            return "#E32017";
        case 2:
            return "#FFD300";
        case 3:
            return "#00782A";
        case 4:
            return "#6950a1";
        case 5:
            return "#F3A9BB";
        case 6:
            return "#9B0056";
        case 7:
            return "#003688";
        case 8:
            return "#0098D4";
        case 9:
            return "#00A4A7";
        case 10:
            return "#EE7C0E";
        case 11:
            return "#B36305";
        case 12:
            return "#84B817";
        case 13:
            return "#8480d7";
        default:
            return "hotpink";
    }
}
