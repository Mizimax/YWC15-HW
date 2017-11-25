import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ModalService {

  private modalToggled = new BehaviorSubject<boolean>(false);

  constructor() { }

  getModalStatus() {
    return this.modalToggled;
  }

  setModalStatus(status: boolean) {
    this.modalToggled.next(status);
  }

}
