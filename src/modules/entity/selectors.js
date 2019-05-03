import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import get from "lodash/get";

import EntitySchema from "./schema";

const getEntities = state => state.entities;

const getAll = () => (
    createSelector(
        getEntities,
        (state, props) => props.entity,
        (state, props) => get(state.entity, `${props.entity}.${props.name}`, []),
        (entities, entityName, data) => {
            const { ids, isFetched, meta } = data;
            const normalized = denormalize({ [entityName]: ids }, { [entityName]: [ EntitySchema(entityName) ] }, entities);

            return {
                items: get(normalized, entityName, []),
                isFetched,
                meta
            };
        }
    )
);

const getOne = () => (
    createSelector(
        getEntities,
        (state, props) => props.entity,
        (state, props) => get(state.entity, `${props.entity}.${props.name}One`, {}),
        (entities, entityName, data) => {

            const { id, isFetched } = data;
            const normalized = denormalize({ [entityName]: id }, { [entityName]: EntitySchema(entityName) }, entities);

            return {
                isFetched,
                item: get(normalized, entityName, {}),
            };
        }
    )
);

export default {
    getAll,
    getOne
};
