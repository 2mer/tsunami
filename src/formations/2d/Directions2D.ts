import Point2D from './Point2D';

const dirOrder = [
	new Point2D(0, -1), // up
	new Point2D(1, 0), // right
	new Point2D(0, 1), // down
	new Point2D(-1, 0), // left
];

const getDir = (index: number) => {
	let nIndex = index % dirOrder.length;

	if (nIndex < 0) {
		nIndex += dirOrder.length;
	}

	return dirOrder[nIndex];
};

class Directions2D {
	readonly DOWN;
	readonly LEFT;
	readonly RIGHT;
	readonly UP;
	readonly rotation;
	readonly invertX;
	readonly invertY;

	constructor({ invertX = false, invertY = false, rotation = 0 } = {}) {
		this.invertX = invertX;
		this.invertY = invertY;
		this.rotation = rotation;

		this.UP = getDir((!this.invertY ? 0 : 2) + this.rotation);
		this.DOWN = getDir((!this.invertY ? 2 : 0) + this.rotation);
		this.RIGHT = getDir((!this.invertX ? 1 : 3) + this.rotation);
		this.LEFT = getDir((!this.invertX ? 3 : 1) + this.rotation);
	}

	rotate(amt: number) {
		return new Directions2D({
			invertX: this.invertX,
			invertY: this.invertY,
			rotation: this.rotation + amt,
		});
	}
}

export default Directions2D;
