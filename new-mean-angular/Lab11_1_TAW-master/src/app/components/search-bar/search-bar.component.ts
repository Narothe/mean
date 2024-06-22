import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TextFormatDirective } from '../../directives/text-format.directive';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, TextFormatDirective],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  public filterText: string = '';

  @Output() name = new EventEmitter<string>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filterText = params['name'] || '';
      this.sendFilter(false); // false to avoid unnecessary navigation on init
    });
  }

  sendFilter(navigate: boolean = true) {
    this.name.emit(this.filterText);
  }
}
