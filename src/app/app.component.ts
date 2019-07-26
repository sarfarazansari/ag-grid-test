import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GoogleService } from './services/google.service';
import { BaseResponse } from './models';
import { IRootObj, IItem } from './interfaces';
import { of, Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { CustomToolPanelComponent, CustomHeaderComponent } from './components';
import 'ag-grid-enterprise';
let _ths;
let apiRes: any[];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  public api: GridApi;
  public columnApi: ColumnApi;

  public title = 'ag-grid-test';
  public columnDefs: any;
  public defaultColDef = { filter: true };
  public rowData$: Observable<IItem[]>;
  public sideBar: any;
  public frameworkComponents: any;
  constructor(
    private _googleService: GoogleService
  ) {
    _ths = this;
    this.prepareHeader();
  }

  public ngOnDestroy() {
    //
  }

  public ngOnInit() {
    this.drawTable();
  }

  public onGridReady(params: any) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.columnApi.setColumnVisible('checkbox', false);
  }

  public onRowSelected(event) {
    // console.log(event.node);
  }

  public onSelectionChanged(event) {
    const rowCount = event.api.getSelectedNodes().length;
    if (rowCount > 0) {
      this.columnApi.setColumnVisible('checkbox', true);
    } else {
      this.columnApi.setColumnVisible('checkbox', false);
    }
  }

  public videoCellRenderer(params) {
    const vidId = _ths.getVideoId(params.rowIndex);
    return `<a href="https://www.youtube.com/watch?v=${vidId}," target="_Blank">${params.value}</a>`;
  }

  public countryCellRenderer(params) {
    // tslint:disable-next-line: max-line-length
    return `<img border='0' width='${params.value.default.width}' height='${params.value.default.height}' style='margin-bottom: 2px' src='${params.value.default.url}'>`;
  }

  public getVideoId(idx: number) {
    return apiRes[idx].id.videoId;
  }

  private drawTable() {
    this._googleService.getData().then((res: BaseResponse<IRootObj, any>) => {
      if (res && res.body && res.body.items) {
        apiRes = res.body.items;
        const arr: any[] = [];
        res.body.items.forEach(item => {
          arr.push(item.snippet);
        });
        this.rowData$ = of(arr);
      }
    }).catch(err => {
      //
    });
  }

  private prepareHeader() {
    this.columnDefs = [
      {
        headerName: '#',
        width: 30,
        field: 'checkbox',
        // headerCheckboxSelection: true,
        checkboxSelection: true,
      },
      {
        headerName: '',
        width: 150,
        headerComponent: 'customHeaderComponent'
      },
      {
        headerName: '',
        field: 'thumbnails',
        cellRenderer: _ths.countryCellRenderer,
      },
      {
        headerName: 'Published on', field: 'publishedAt'
      },
      {
        headerName: 'Video Title',
        field: 'title',
        cellRenderer: _ths.videoCellRenderer,
      },
      { headerName: 'Description', field: 'description' }
    ];

    this.sideBar = {
      toolPanels: [
        {
          id: 'customTool',
          labelDefault: 'Custom Tool',
          labelKey: 'customTool',
          iconKey: 'menu',
          toolPanel: 'customStatsToolPanel'
        }
      ],
      defaultToolPanel: 'customTool'
    };
    this.frameworkComponents = {
      customHeaderComponent: CustomHeaderComponent,
      customStatsToolPanel: CustomToolPanelComponent
    };
  }
}

