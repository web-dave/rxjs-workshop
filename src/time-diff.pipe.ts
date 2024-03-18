import { pipe, tap, map, pairwise } from 'rxjs';

export function timeDiff() {
  return pipe(
    tap((data: any) => console.log(data)),
    map((evt: MouseEvent) => evt.timeStamp),
    tap((data) => console.log(data)),
    pairwise(),
    tap((data) => console.log(data)),
    map(([prev, click]) => click - prev),
    tap((data) => console.log(data))
  );
}
