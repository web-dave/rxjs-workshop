import { fromEvent, map, Observable, pipe, switchMap, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const btn = document.querySelector('button');
const input = document.querySelector('input');
const output: HTMLUListElement = document.querySelector('ul');

function searchUser() {
  return pipe(
    map((event: InputEvent) => (event.target as HTMLInputElement).value),
    switchMap((search) =>
      ajax
        .getJSON('http://localhost:3000/users?first_name_like=' + search)
        .pipe(
          map((data: { first_name: string; last_name: string }[]) =>
            data.map((u) => u.first_name + ', ' + u.last_name)
          )
        )
    )
  );
}

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}
// coding start here
fromEvent(input, 'input')
  .pipe(
    searchUser(),
    // map((event: InputEvent) => (event.target as HTMLInputElement).value),
    // switchMap((search) =>
    //   ajax
    //     .getJSON('http://localhost:3000/users?first_name_like=' + search)
    //     .pipe(
    //       map((data: { first_name: string; last_name: string }[]) =>
    //         data.map((u) => u.first_name + ', ' + u.last_name)
    //       )
    //     )
    // ),
    tap((data: string[]) => console.log(data))
  )
  .subscribe();
