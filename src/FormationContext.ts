import Formation from './Formation';
import FormationProbability from './FormationProbability';

type FormationContext<
	P extends FormationProbability,
	F extends Formation<any, any> = Formation<any, any>
> = {
	cid: Symbol;
	invalidations: P[];
	formation: F;
};

export default FormationContext;
