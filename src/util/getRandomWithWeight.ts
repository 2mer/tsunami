export default function getRandomWithWeight(items: any[], weights: number[]) {
	weights.forEach((_, i) => {
		weights[i] += weights[i - 1] || 0;
	});

	const rand = Math.random() * weights[weights.length - 1];

	return items[weights.findIndex((w) => w >= rand)];
}
