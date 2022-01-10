import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styles: [
  ]
})
export class InputSearchComponent implements OnInit {

  @Input() placeholder: string = 'Search...';

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe( val => {
        this.onDebounce.emit(val);
      });
  }

  onKeyInput(event: any) {
    const val = event.target.value;
    this.debouncer.next(this.searchTerm);
  }

  search() {
    this.onEnter.emit(this.searchTerm);
    
  }

}
