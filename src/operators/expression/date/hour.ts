// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators

import { Options } from '../../../core'
import { computeDate } from './_internal'

/**
 * Returns the hour for a date as a number between 0 and 23.
 * @param obj
 * @param expr
 */
export function $hour(obj: object, expr: any, options: Options): number {
  let d = computeDate(obj, expr, options)
  return d.getUTCHours()
}
