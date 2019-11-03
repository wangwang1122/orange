export const subTimes = Array(Math.ceil((24 - 9))).fill(9).map((x, y) => x + y).flatMap(x => [":00", ":15", ":30", ":45"].map(y => x + y)).concat("0:00");
export const times = subTimes.filter(x => x.split(":")[1] === "00");
