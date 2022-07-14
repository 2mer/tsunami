export default class Point2D {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(x: number | Point2D, y?: number) {
		if (typeof x === 'number' && typeof y === 'number') {
			return new Point2D(this.x + x, this.y + y);
		} else if (x instanceof Point2D) {
			return new Point2D(this.x + x.x, this.y + x.y);
		}

		throw new Error('Invalid signature');
	}
}
