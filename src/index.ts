import { PartialObserver } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

const myObservable = {
  observers: [],
  subscribe: function (observer: PartialObserver<string>) {
    myObservable.observers.push(observer);
    setTimeout(
      () => myObservable.observers.forEach((o) => o.next('Hallo')),
      1500
    );
  },
};

myObservable.subscribe({
  next: (data) => console.log(data),
});
