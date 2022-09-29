import { pipe, debounceTime, map, switchMap, retry } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export function userFilterPipe<T>() {
  return pipe(
    map((e: Event) => (e.target as HTMLInputElement).value),
    debounceTime(300),
    switchMap((data) =>
      ajax
        .getJSON<T>('http://localhost:3000/users?first_name_like=' + data)
        .pipe(retry({ count: 7, delay: 500, resetOnSuccess: true }))
    )
  );
}
