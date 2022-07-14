import FormationItem from '../../FormationItem';
import Point2D from './Point2D';
import TileProbability from './TileProbability';

export default class Tile<
	P extends TileProbability = TileProbability
> extends FormationItem<P> {
	position: Point2D;

	constructor(position: Point2D) {
		super();

		this.position = position;
	}
}
