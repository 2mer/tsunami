import FormationContext from './FormationContext';
import FormationProbability from './FormationProbability';
import getRandomWithWeight from './util/getRandomWithWeight';

export default class FormationItem<P extends FormationProbability> {
	probabilities: P[] = [];
	collapsed: P | undefined = undefined;
	lastCalc: Symbol | undefined;

	calcProbabilities(ctx: FormationContext<P>) {
		const { formation, cid } = ctx;

		if (!this.collapsed && cid !== this.lastCalc) {
			this.lastCalc = cid;

			this.probabilities = formation
				.getProbabilities()
				.filter((p) => p.isProbable(ctx));
		}
	}

	collapse(ctx: FormationContext<P>) {
		if (!this.collapsed) {
			if (this.probabilities.length) {
				this.collapsed = getRandomWithWeight(
					this.probabilities,
					this.probabilities.map((p) => p.getWeight())
				);

				ctx.invalidations.forEach((inv: any) => {
					inv.calcProbabilities(ctx);
				});
			}
		}
	}

	isCollapsed() {
		return Boolean(this.collapsed);
	}
}
