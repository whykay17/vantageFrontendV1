import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  features = [
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive YouTube channel analytics with real-time metrics, engagement tracking, and performance insights.',
      icon: 'pi pi-chart-line'
    },
    {
      title: 'Video Management',
      description: 'Efficiently manage your video content, track performance, and optimize your content strategy.',
      icon: 'pi pi-video'
    },
    {
      title: 'Audience Insights',
      description: 'Understand your audience better with detailed demographics, engagement patterns, and viewer behavior analysis.',
      icon: 'pi pi-users'
    },
    {
      title: 'Performance Reports',
      description: 'Generate detailed reports on channel growth, revenue, and content performance over time.',
      icon: 'pi pi-file'
    }
  ];

  sections = [
    {
      title: 'Track Your Growth',
      description: 'Monitor your channel\'s performance with our intuitive dashboard. Get insights on views, subscribers, engagement, and more.',
      image: 'assets/background.jpg',
      isVisible: false
    },
    {
      title: 'Understand Your Audience',
      description: 'Dive deep into viewer demographics, watch time patterns, and engagement metrics to create content that resonates.',
      image: 'assets/profile.jpeg',
      isVisible: false
    },
    {
      title: 'Optimize Your Content',
      description: 'Use data-driven insights to improve your content strategy and grow your channel effectively.',
      image: 'assets/youtubeLogo.png',
      isVisible: false
    }
  ];

  ngOnInit() {
    // Any initialization logic
  }

  onIntersection(event: any, index: number): void {
  if (event.visible) {
    this.sections[index].isVisible = true;
  }
}

}
