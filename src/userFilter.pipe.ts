import { pipe, debounceTime, map, switchMap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export function userFilterPipe<T>() {
  return pipe(
    map((e: Event) => (e.target as HTMLInputElement).value),
    debounceTime(300),
    switchMap((data) =>
      ajax.getJSON<T>('http://localhost:3000/users?first_name_like=' + data)
    )
  );
}
