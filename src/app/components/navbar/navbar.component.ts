import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  HeaderPage: string = 'لوحة تحكم';

  constructor(private _router: Router, private _searchService: SearchService) {}
  ngOnInit(): void {
    if (this._router.url.includes('Dashbourd')) {
      this.HeaderPage = 'لوحة تحكم';
    } else if (this._router.url.includes('User')) {
      this.HeaderPage = 'ادارة المستخدمين';
    }
  }
  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this._searchService.updateSearchTerm(term);
  }
}
