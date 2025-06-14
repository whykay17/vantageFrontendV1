import { Component, Output, EventEmitter } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range',
  imports: [DatePickerModule,DialogModule,ButtonModule,FormsModule],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.css'
})

export class DateRangeComponent {
  @Output() rangeData = new EventEmitter<any>();

  customRange: any;
  minDate = new Date(2010, 0, 1);
  maxDate = new Date();
  show = true;

  apply() {
    if (this.customRange?.length === 2) {
      this.rangeData.emit(this.customRange);
      this.show = false;
    }
  }

  cancel() {
    this.rangeData.emit(null);
    this.show = false;
  }
}