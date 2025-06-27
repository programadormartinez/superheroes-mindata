import { Component, inject, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { Heroe } from '../../models/heroe';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class HeroesListComponent {

  readonly dialog = inject(MatDialog);
  heroes = input<any[]>([]);
  pageChange = output<number>();
  addHeroeEvent = output<void>();
  editHeroe = output<number>();
  deleteHeroe = output<number>();
  searchHeroeNameEvent = output<string>();
  searchHeroeIdEvent = output<string>();
  pageSize = 10;
  pageIndex = 0;
  displayedColumns: string[] = ['id', 'name', 'power', 'universe', 'actions'];
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageChange.emit(this.pageIndex);
  }

  addHeroe(): void {
    this.addHeroeEvent.emit();
  }

  searchHeroe($event: any): void {
    const name = $event.target.value.trim().toLowerCase();
    this.searchHeroeNameEvent.emit(name);
  }

  searchHeroeForId($event: any): void {
    const id = $event.target.value;
    this.searchHeroeIdEvent.emit(id);
  }

  editHero(id: number): void {
    this.editHeroe.emit(id);
  }

  deleteHero(heroe: Heroe): void {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '250px',
      data: {
        heroe: heroe,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'delete') {
         this.deleteHeroe.emit(heroe.id);
      }
    });
  }
}


