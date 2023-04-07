import { Component } from '@angular/core';

@Component({
  selector: 'chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css'],
})
export class Chart2Component {
  data: any;
  options: any;

  constructor() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    this.options = {
      plugins: {
        title: {
          display: true,
          text: 'My Title',
          fontSize: 16,
        },
        legend: {
          position: 'bottom',
        },
      },
    };
  }
}
