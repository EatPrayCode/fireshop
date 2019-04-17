import {ChangeDetectorRef, Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RxDestroy} from '@jaspero/ng-helpers';
import {FirestoreCollections} from '@jf/enums/firestore-collections.enum';
import {notify} from '@jf/utils/notify.operator';
import * as nanoid from 'nanoid';
import {from, of} from 'rxjs';
import {map, switchMap, take, takeUntil} from 'rxjs/operators';
import {StateService} from '../../services/state/state.service';
import {queue} from '../../utils/queue.operator';

@Component({
  selector: 'jfsc-single-page',
  template: ''
})
export class SinglePageComponent extends RxDestroy {
  constructor(
    public router: Router,
    public afs: AngularFirestore,
    public state: StateService,
    public activatedRoute: ActivatedRoute,
    public cdr: ChangeDetectorRef,
    public fb: FormBuilder
  ) {
    super();
  }

  isEdit: string;
  collection: FirestoreCollections;
  form: FormGroup;

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(params => {
          if (params.id === 'new') {
            this.isEdit = '';
            return of({});
          } else {
            this.isEdit = params.id;
            return this.afs
              .collection(this.collection)
              .doc(params.id)
              .valueChanges()
              .pipe(
                take(1),
                map(value => ({
                  ...value,
                  id: params.id
                })),
                queue()
              );
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe(data => {
        this.buildForm(data);
        this.cdr.detectChanges();
      });
  }

  save(item = this.form.getRawValue()) {
    this.activatedRoute.params
      .pipe(
        take(1),
        switchMap(() =>
          from(
            this.afs
              .collection(this.collection)
              .doc(item.id ? item.id : nanoid())
              .set({
                item,
                ...(this.isEdit ? {} : {createdOn: Date.now()})
              })
          )
        ),
        notify()
      )
      .subscribe(() => {
        this.router.navigate(['/', this.collection]);
      });
  }

  buildForm(data: any) {}

  cancel() {
    this.router.navigate(['/', this.collection]);
  }
}
