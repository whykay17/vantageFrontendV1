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
      const startDate = this.formatDate(this.customRange[0]);
      var endDate = this.formatDate(this.customRange[1]);
      if (endDate < startDate) {
        endDate= this.formatDate(new Date());
      }

      this.rangeData.emit({
        start: startDate,
        end: endDate
      });

      this.show = false;
    }
  }

  cancel() {
    this.rangeData.emit(null);
    this.show = false;
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().slice(0, 10);
  }
}