import FormationContext from './FormationContext';

export default abstract class FormationProbability {
	getWeight() {
		return 1;
	}

	abstract isProbable(ctx: FormationContext<this>): boolean;
}
