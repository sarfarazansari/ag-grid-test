import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';

@Component({
  templateUrl: './custom-header.component.html'
})
export class CustomHeaderComponent implements IHeaderAngularComp {
  public selectAll = false;
  public params: any;
  constructor() { }

  agInit(params): void {
    this.params = params;
  }

  checkValue(e: any) {
    if (this.selectAll) {
      this.params.api.selectAll();
    } else {
      this.params.api.deselectAll();
    }
  }
}
