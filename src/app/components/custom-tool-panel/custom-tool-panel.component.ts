import { Component } from '@angular/core';

import { IToolPanel, IToolPanelParams } from 'ag-grid-community';

@Component({
  templateUrl: './custom-tool-panel.component.html',
  styles: [`
    .totalStyle {
      padding-bottom: 15px
    }
  `]
})

export class CustomToolPanelComponent implements IToolPanel {
  public params: IToolPanelParams;
  public rowCount: string;
  public selectedRowCount: number;

  public agInit(params: IToolPanelParams): void {
    this.params = params;
    this.selectedRowCount = 0;

    // calculate stats when new rows loaded, i.e. onModelUpdated
    this.params.api.addEventListener('modelUpdated', this.updateTotals.bind(this));
    // calculate when row selected
    this.params.api.addEventListener('rowSelected', this.getSelectedRows.bind(this));
  }

  public refresh() {
    //
  }

  public updateTotals(): void {
    this.calculateRowCount();
    this.getSelectedRows();
  }

  public calculateRowCount() {
    const model = this.params.api.getModel();
    const processedRows = model.getRowCount();
    this.rowCount = processedRows.toLocaleString();
  }

  public getSelectedRows() {
    this.selectedRowCount = this.params.api.getSelectedNodes().length;
  }

  public toggleSelections() {
    if (this.selectedRowCount > 0) {
      this.params.api.deselectAll();
    } else {
      this.params.api.selectAll();
    }
  }
}
