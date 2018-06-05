import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 10;

  public incrementCounter() {
    this.currentCount++;
  }

  public decrementCounter() {
    this.currentCount--;
  }
}
