import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { isMobile } from 'mobile-device-detect';
import { LocalDataSource } from 'ng2-smart-table';
import { takeWhile } from 'rxjs/operators';

export interface TableConfig<T> {
  title: string;
  columns: {
    [Property in keyof T]: {
      title: string;
    }
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  // Inputs
  @Input()
  title!: string;

  @Input()
  isLoading = false;

  @Input()
  public set config(v: TableConfig<any>[]) {
    this.#config = v;
  }
  public get config(): TableConfig<any>[] {
    return this.#config;
  }

  @Input()
  public set data(v: any[]) {
    this.source.load(v);
    this.#data = v;
  }
  public get data(): any[] {
    return this.#data;
  }

  @Input()
  public set columns(columns: any) {
    this.settings = { ...this.#baseSettings, columns: { ...columns } };
  }
  // < Inputs End >

  // Outputs
  @Output()
  requestData: EventEmitter<any> = new EventEmitter();
  @Output()
  optionsSelected: EventEmitter<any> = new EventEmitter();
  // < Outputs End >

  #config!: TableConfig<any>[];
  #data!: any[];
  readonly #baseSettings = {
    mode: 'external',
    actions: {
      add: false,
      edit: true,
      delete: false,
      position: isMobile ? 'left' : 'right'
    },
    edit: {
      editButtonContent: '<i class="eva eva-more-horizontal-outline"></i>'
    },
  }
  settings = {}
  source: LocalDataSource = new LocalDataSource([]);

  isLive = true;

  constructor() { }

  ngOnInit(): void {
    this.source.onChanged()
      .pipe(takeWhile(() => this.isLive))
      .subscribe(event => {
        switch (event.action) {
          case 'page':
          case 'filter':
          case 'sort':
            this.requestMoreData(event)
            break;
        }
      });
  }

  async requestMoreData(event: any) {
    const filteredElements = await this.source.getFilteredAndSorted();
    const nosOfPages = Math.floor(filteredElements.length / event.paging.perPage) + 1;

    // If navigated to either of the last 2 pages, request more data
    const shouldRequest = (nosOfPages - event.paging.page) < 2;
    if (shouldRequest) {
      event.paging.nosOfPages = nosOfPages;
      event.filter = (event.filter.filters as any[]).filter(d => d.search !== '');
      console.log({ ...event })
      this.requestData.emit({ ...event });
    }
  }

  onEdit(event: any) {
    this.optionsSelected.emit(event);
  }

  ngOnDestroy(): void {
    this.isLive = false;
  }

}