import { Component, ElementRef, signal, ViewChild, AfterViewInit, OnInit, HostListener, AfterViewChecked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Champion } from './champion';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ScrollingModule, MatToolbarModule, MatCardModule, CdkVirtualScrollViewport],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit{
  protected readonly title = signal('site-lol');
  leftBoxes = Array(5);
  rightBoxes = Array(5);
  champions: any[] = [];
  groupedChamps: Champion[][] = [];
  itemSize = 120;
  cardWidth = 110;

  //placeholder values ^

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  @ViewChild('rowRef') rowRef!: ElementRef<HTMLDivElement>;
  @ViewChild('gridContainer') gridContainer!: CdkVirtualScrollViewport;

  constructor(private champion: Champion) {}

  ngOnInit(): void{
    console.log('ngOnInit fired!');
    this.champion.getChampions().subscribe(data =>{
      this.champions = data;
    });
  }

  ngAfterViewInit(): void {
      console.log('ngAfterViewInit fired!');
      if(this.champions.length > 0){
        this.groupRows();
      }
    }

  @HostListener('window:resize')
    onResize() {
      console.log('Window resized');
      this.groupRows();
    }

  private groupRows() {
    this.groupedChamps = [];
      
    console.log('groupRows called');
    console.log('gridContainer exists?', !!this.gridContainer.elementRef.nativeElement);
    console.log('champions length:', this.champions.length);

    if (this.champions.length === 0) {
      console.log('⚠️ groupRows aborted: champions not loaded');
      return;
    }

    if (!this.gridContainer?.elementRef.nativeElement) {
      console.log('⚠️ groupRows aborted: container not ready');
      return;
    }
  
    const containerWidth = this.gridContainer.elementRef.nativeElement.offsetWidth;
    if (containerWidth === 0) {
      console.log('⚠️ container width 0, retrying...');
      setTimeout(() => this.groupRows(), 50);
      return;
    }
    const perRow = Math.max(1, Math.floor(containerWidth / this.cardWidth));

    for (let i = 0; i < this.champions.length; i += perRow) {
      this.groupedChamps.push(this.champions.slice(i, i + perRow));
    }

    console.log('Container width:', containerWidth);
    console.log('Champions per row:', perRow);
    console.log('Number of rows:', this.groupedChamps.length);

    setTimeout(() => {
      if (this.rowRef?.nativeElement) {
        const rowHeight = this.rowRef.nativeElement.offsetHeight;
        this.itemSize = rowHeight;         
        this.viewport.checkViewportSize(); // recalc CDK viewport
        }
      })
    }

  }
