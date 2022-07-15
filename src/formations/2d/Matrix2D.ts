import Formation from '../../Formation';
import FormationItem from '../../FormationItem';
import Point2D from './Point2D';
import Tile from './Tile';
import TileProbability from './TileProbability';

export type Matrix2DOptions<T extends Tile<P>, P extends TileProbability> = {
	width: number;
	height: number;
	probabilities: P[];
	createTile: (position: Point2D, mat: Matrix2D<T, P>) => T;
};

export default class Matrix2D<
	T extends Tile<P>,
	P extends TileProbability
> extends Formation<T, P> {
	width: number;
	height: number;
	mat: T[][];
	createTile;
	probabilities: P[];
	protected topLeft: Point2D;

	constructor({
		width,
		height,
		createTile,
		probabilities,
	}: Matrix2DOptions<T, P>) {
		super();

		this.width = width;
		this.height = height;
		this.probabilities = probabilities;
		this.createTile = createTile;
		this.topLeft = new Point2D(0, 0);

		this.mat = Array.from({ length: height }, (_, j) =>
			Array.from({ length: width }, (_, i) => {
				const f = this.createTile(new Point2D(i, j), this);

				this.items.push(f);

				return f;
			})
		);
	}

	get(position: Point2D) {
		return this.mat?.[position.y - this.topLeft.y]?.[
			position.x - this.topLeft.y
		];
	}

	below(position: Point2D | T) {
		let pos;

		if (position instanceof FormationItem) {
			pos = position.position;
		} else {
			pos = position;
		}

		return this.get(pos.add(0, 1));
	}

	above(position: Point2D | T) {
		let pos;

		if (position instanceof FormationItem) {
			pos = position.position;
		} else {
			pos = position;
		}

		return this.get(pos.add(0, -1));
	}

	left(position: Point2D | T) {
		let pos;

		if (position instanceof FormationItem) {
			pos = position.position;
		} else {
			pos = position;
		}

		return this.get(pos.add(-1, 0));
	}

	right(position: Point2D | T) {
		let pos;

		if (position instanceof FormationItem) {
			pos = position.position;
		} else {
			pos = position;
		}

		return this.get(pos.add(1, 0));
	}

	column(position: Point2D | T) {
		let pos: Point2D;

		if (position instanceof FormationItem) {
			pos = position.position;
		} else {
			pos = position;
		}

		return this.mat.map((row) => row[pos.x]);
	}

	row(position: Point2D | T) {
		let pos: Point2D;

		if (position instanceof FormationItem) {
			pos = position.position;
		} else {
			pos = position;
		}

		return this.mat[pos.y];
	}

	expand(
		exp:
			| number
			| { top: number; left: number; bottom: number; right: number }
	) {
		const {
			top = 0,
			left = 0,
			bottom = 0,
			right = 0,
		} = typeof exp === 'number'
			? { top: exp, left: exp, bottom: exp, right: exp }
			: exp;

		this.topLeft = this.topLeft.add(-left, -top);
		this.mat = Array.from({ length: this.height + top + bottom }, (_, j) =>
			Array.from({ length: this.width + left + right }, (_, i) => {
				const m = this.mat?.[j - top]?.[i - left];

				if (m) {
					return m;
				}

				const f = this.createTile(
					new Point2D(i + this.topLeft.x, j + this.topLeft.y),
					this
				);

				this.items.push(f);

				return f;
			})
		);

		this.width += left + right;
		this.height += top + bottom;
	}

	tileMissingOrCheck(position: Point2D, callback: (tile: T) => boolean) {
		const tile = this.get(position);

		if (!tile) return true;

		return callback(tile);
	}
}
