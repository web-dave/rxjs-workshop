import {} from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here
const myObservable = {
  observer: null,
  subscribe: (observer: any) => {
    myObservable.observer = observer;
    setInterval(() => myObservable.observer.next('Hello'), 1500);
  },
};

myObservable.subscribe({
  next: (data) => console.log('next', data),
});
