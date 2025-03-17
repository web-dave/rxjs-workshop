import { pipe, take, map, tap, pairwise } from 'rxjs';

export const limitDiffOperator = (limit: number) => {
  return pipe(
    take(limit),
    map((data: Event) => data.timeStamp),
    tap((data) => console.log(data)),
    pairwise(),
    map(([prev, curr]) => curr - prev)
  );
};
