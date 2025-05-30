import { UnexpectedError } from '@shared/domain/errors/unexpected.error';
import { Criteria } from '@shared/domain/repositories/criteria';
import { FilterOperator, Filters } from '@shared/domain/repositories/filters';
import { Order, OrderType } from '@shared/domain/repositories/order';

import { Op, Order as SequelizeOrder } from 'sequelize';

type FilterValue = string | number | boolean;

type WhereClause = Record<string, Record<symbol, FilterValue>>;

const operatorMap: Record<FilterOperator, symbol> = {
    [FilterOperator.EQUALS]: Op.eq,
    [FilterOperator.NOT_EQUALS]: Op.ne,
    [FilterOperator.GREATER_THAN]: Op.gt,
    [FilterOperator.LESS_THAN]: Op.lt,
    [FilterOperator.LIKE]: Op.like,
};

export class SequelizeCriteriaConverter {
    private readonly filters: Filters[];
    private readonly order: Order | undefined;
    private readonly offset: number | undefined;
    private readonly limit: number | undefined;

    constructor(readonly criteria: Criteria) {
        this.filters = criteria.filters;
        this.order = criteria.order;
        this.offset = criteria.offset;
        this.limit = criteria.limit;
    }

    public build(): {
        where: WhereClause;
        order: SequelizeOrder | undefined;
        offset: number | undefined;
        limit: number | undefined;
    } {
        return {
            where: this.buildSequelizeWhere(),
            order: this.buildSequelizeOrder(),
            offset: this.offset,
            limit: this.limit,
        };
    }

    private buildSequelizeWhere(): WhereClause {
        const where: WhereClause = {};

        this.filters.forEach((filter) => {
            const field = filter.field;
            const operator = filter.operator;
            const value = filter.value;

            if (!operatorMap[operator]) {
                throw new UnexpectedError(`Not supported operator: ${operator}`);
            }

            if (!where[field]) {
                where[field] = {};
            }

            where[field][operatorMap[operator]] = value;
        });

        return where;
    }

    private buildSequelizeOrder(): SequelizeOrder | undefined {
        if (!this.order || this.order.isNone()) {
            return;
        }

        const orderBy = this.order.orderBy;
        const orderType = this.order.orderType;

        if (!orderBy || orderType === OrderType.NONE) {
            return;
        }

        return [[orderBy, orderType]];
    }
}
