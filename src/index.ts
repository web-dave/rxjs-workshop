import { fromEvent, map, Observable, PartialObserver, tap } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

const myObservable: Observable<string> = fromEvent(btn, 'click').pipe(
  tap((data) => console.log(data)),
  map((data) => data.timeStamp),
  tap((data) => console.log(data)),
  map((data) => data + '')
);

myObservable.subscribe({
  next: (data) => print(data),
});
