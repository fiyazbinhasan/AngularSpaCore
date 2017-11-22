import { Component } from '@angular/core';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    public currentCount = 20;

    public incrementCounter() {
        this.currentCount++;
    }

    public decrementCounter() {
        this.currentCount--;
    }
}
