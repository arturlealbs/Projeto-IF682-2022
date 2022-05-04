import { Component } from '@angular/core';

import {FuiBaseModal, ComponentModalConfig, ModalSize } from "ngx-fomantic-ui"
import { User } from '../../shared/types/User';
interface IConfirmModalContext {
    userInModal: User;
}

@Component({
    selector: 'modal-confirm',
    templateUrl: './modal-details.component.html',
    styleUrls: ['./modal-details.component.scss']
})
export class ModalDetailsComponent {
    constructor(public modal:FuiBaseModal<IConfirmModalContext, void, void>) {
    }
}

export class ModalDetails extends ComponentModalConfig<IConfirmModalContext, void, void> {
  constructor(userInModal:User, size = ModalSize.Tiny) {
      super(ModalDetailsComponent, { userInModal });
      this.isClosable = true;
      this.transitionDuration = 200;
      this.size = size;
      this.isCentered = true;
      
  }
}