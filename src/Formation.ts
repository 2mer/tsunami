import FormationItem from './FormationItem';
import FormationProbability from './FormationProbability';
import sample from 'lodash-es/sample';

export default class Formation<
	T extends FormationItem<P>,
	P extends FormationProbability
> {
	protected items: T[] = [];
	protected probabilities: P[] = [];

	getItems() {
		return this.items;
	}

	getProbabilities() {
		return this.probabilities;
	}

	// returns true when there are still items that need to be collapsed
	collapse(): boolean {
		const collapsableItems = this.items
			.filter((item) => !item.collapsed)
			.sort((a, b) => a.probabilities.length - b.probabilities.length)
			.filter((item) => Boolean(item.probabilities.length));
		const [firstItem] = collapsableItems;

		if (firstItem) {
			const probableItems = collapsableItems.filter(
				(item) =>
					item.probabilities.length === firstItem.probabilities.length
			);

			const pItem = sample(probableItems);

			const ctx = {
				formation: this,
				item: pItem,
				cid: Symbol('collapse'),
				invalidations: [],
			};

			pItem!.collapse(ctx);

			return true;
		}

		return false;
	}

	collapseAll({ step = 1, timeout = 0, onComplete = () => {} } = {}) {
		const t = setInterval(() => {
			let ret = true;

			for (let i = 0; i < step; i++) {
				ret = ret && this.collapse();
			}

			if (!ret) {
				clearInterval(t);
				onComplete();
			}
		}, timeout);

		return () => {
			clearInterval(t);
		};
	}
}
