import { Component } from '@angular/core';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-reports',
    standalone: true,
    imports: [],
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.css'
})
export class ReportsComponent {
  reports = [
    { 
      title: 'Sales Report', 
      description: 'Monthly sales analysis', 
      url: this.sanitize('https://lookerstudio.google.com/embed/reporting/f97c925e-43c8-44f8-82b9-d3a658343df7/page/U0wsE') 
    },
    { 
      title: 'User Activity', 
      description: 'Weekly engagement overview', 
      url: this.sanitize('https://lookerstudio.google.com/embed/reporting/your-report-url/page/xyz') 
    },
    { 
      title: 'Revenue Insights', 
      description: 'Quarterly revenue growth', 
      url: this.sanitize('https://lookerstudio.google.com/embed/reporting/your-other-report-url/page/abc') 
    },
    { 
      title: 'Sales Report', 
      description: 'Monthly sales analysis', 
      url: this.sanitize('https://lookerstudio.google.com/embed/reporting/f97c925e-43c8-44f8-82b9-d3a658343df7/page/U0wsE') 
    },
    { 
      title: 'User Activity', 
      description: 'Weekly engagement overview', 
      url: this.sanitize('https://lookerstudio.google.com/embed/reporting/your-report-url/page/xyz') 
    },
    { 
      title: 'Revenue Insights', 
      description: 'Quarterly revenue growth', 
      url: this.sanitize('https://lookerstudio.google.com/embed/reporting/your-other-report-url/page/abc') 
    },
    { 
      title: 'Sales Report', 
      description: 'Monthly sales analysis', 
      url: this.sanitize('https://lookerstudio.google.com/embed/reporting/f97c925e-43c8-44f8-82b9-d3a658343df7/page/U0wsE') 
    },
    { 
      title: 'User Activity', 
      description: 'Weekly engagement overview', 
      url: this.sanitize('https://lookerstudio.google.com/embed/reporting/your-report-url/page/xyz') 
    },
    { 
      title: 'Revenue Insights', 
      description: 'Quarterly revenue growth', 
      url: this.sanitize('https://lookerstudio.google.com/embed/reporting/your-other-report-url/page/abc') 
    }
  ];

  selectedReport: number | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  sanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openReport(index: number) {
    this.selectedReport = index;
  }

  closeReport(event: Event) {
    this.selectedReport = null;
  }
}