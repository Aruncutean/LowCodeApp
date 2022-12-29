import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAplication } from 'src/app/model/IAplication';
import { IServerResponse } from 'src/app/model/IServerResponse';
import { AplicationService } from 'src/app/service/aplication.service';
import { SessionStorageManagerService } from 'src/app/service/sesion-storage-manager';

@Component({
  selector: 'create-app-popap',
  templateUrl: './create-app-popap.component.html',
  styleUrls: ['./create-app-popap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAppPopapComponent {
  @Input() isActive: boolean = false;
  loadingIndicator: boolean = false;
  errorMassage!: string;
  alertIsShow = false;
  @Output() closePopapEmitter: EventEmitter<any> = new EventEmitter();
  aplicationFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(105)
    ])
  });

  get name() {
    return this.aplicationFormGroup.get('name');
  }

  get description() {
    return this.aplicationFormGroup.get('description');
  }

  constructor(
    private router: Router,
    private appService: AplicationService,
    private ssm: SessionStorageManagerService,
    private refCD: ChangeDetectorRef
  ) {}

  closePopap() {
    this.aplicationFormGroup.reset();
    this.closePopapEmitter.emit();
  }

  saveAplication() {
    if (this.aplicationFormGroup.valid) {
      this.loadingIndicator = true;
      this.appService
        .addAplicatio({
          name: String(this.aplicationFormGroup.value.name),
          description: String(this.aplicationFormGroup.value.description),
          idUser: this.ssm.getUserInfo().id
        })
        .subscribe((data: IServerResponse<IAplication>) => {
          console.log(data);
          this.router.navigate(['lowCode',data.returnValue.id]);
          this.loadingIndicator = false;
          this.refCD && this.refCD.detectChanges();
        });
    } else {
      this.alertIsShow = true;
      this.errorMassage = 'Complete all the fields';
    }
  }
}
