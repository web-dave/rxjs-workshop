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
  subscribe: function (obs) {
    this.observer = obs;
    ///////// Producer ///////
    const i = setInterval(() => {
      this.observer.next('Hallo');
    }, 2000);
    ///////
    return function unsubscribe() {
      clearInterval(i);
    };
  },
  foo: () => {
    console.log(this);
    myObservable.observer.next('FOOO');
  },
};

const sub = myObservable.subscribe({
  next: (data) => console.log(data),
});
myObservable.foo();
setTimeout(() => {
  sub();
}, 4500);
