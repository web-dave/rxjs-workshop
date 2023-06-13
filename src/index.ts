import { fromEvent, map, pairwise, take, tap } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}
// coding start here

const buttonObservable$ = fromEvent(btn, 'click');

// buttonObservable$.subscribe();

const sub = buttonObservable$
  .pipe(
    take(7),
    tap((data) => console.log(data)),
    map((data) => data.timeStamp),
    pairwise(),
    tap((data) => console.log(data)),
    map((data) => data[1] - data[0]),
    tap((data) => console.log(data)),
    map((hurz) => hurz.toString()),
    tap((data) => console.log(data))
  )
  .subscribe({
    next: (data) => {
      print(data);
    },
    complete: () => print('Ich habe fertig'),
  });
setInterval(() => {
  console.log(sub.closed);
}, 1500);
// buttonObservable$.subscribe((data) => console.log(data));

// const myObservable = {
//   observer: null,
//   subscribe: function (obs) {
//     this.observer = obs;
//     ///////// Producer ///////
//     const i = setInterval(() => {
//       this.observer.next('Hallo');
//     }, 2000);
//     ///////
//     return function unsubscribe() {
//       clearInterval(i);
//     };
//   },
//   foo: () => {
//     console.log(this);
//     myObservable.observer.next('FOOO');
//   },
// };

// const sub = myObservable.subscribe({
//   next: (data) => console.log(data),
// });

// setTimeout(() => {
//   sub();
// }, 4500);

// myObservable.foo();
