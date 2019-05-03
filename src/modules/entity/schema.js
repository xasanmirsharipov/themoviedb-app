import { schema } from 'normalizr';

export default  (entityName, idAttribute = 'id') => {
	return new schema.Entity(entityName, undefined, { idAttribute });
};