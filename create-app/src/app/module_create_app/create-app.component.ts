import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Route, Router } from '@angular/router';
import { IAplication } from '../model/IAplication';
import { IPagination } from '../model/IPagination';
import { IServerResponse } from '../model/IServerResponse';
import { IUserInfo } from '../model/IUserInfo';
import { AplicationService } from '../service/aplication.service';
import { SessionStorageManagerService } from '../service/sesion-storage-manager';

@Component({
  selector: 'create-app-root',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAppComponent implements OnInit {
  aplication: IAplication[] = [];
  loadingIndicator: boolean = false;
  numberOfPages: number = 1;
  pageNumber = 1;

  showPopap: boolean = false;
  constructor(
    private router: Router,
    private aplicationService: AplicationService,
    private ssm: SessionStorageManagerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAplication(1);
  }

  getAplication(pages: number) {
    let userInfo: IUserInfo = this.ssm.getUserInfo();
    this.loadingIndicator = true;
    this.aplicationService.getAplication(userInfo.id, pages, 6).subscribe(
      (data: IServerResponse<IPagination>) => {
        this.aplication = data.returnValue.aplications;
        this.numberOfPages = data.returnValue.numberOfPages;
        this.loadingIndicator = false;
        this.cdr && this.cdr.detectChanges();
      },
      error => {
        this.loadingIndicator = false;
        this.cdr && this.cdr.detectChanges();
      }
    );
  }
  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
      this.getAplication(this.pageNumber);
    }
  }

  nextPage() {
    if (this.pageNumber < this.numberOfPages) {
      this.pageNumber = this.pageNumber + 1;
      this.getAplication(this.pageNumber);
    }
  }

  addNewAplication() {
    this.showPopap = !this.showPopap;
  }

  onImgError(event: any) {
    event.target.src = 'assets/imagenotfound.png';
  }

  goToAplication(idAplication: string) {
    this.router.navigate(['lowCode', idAplication]);
  }
}
