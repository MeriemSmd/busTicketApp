import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../dto/client';
import { InitService } from '../service/initService';
import { Store } from '@ngrx/store';
import { UserAction } from '../state/user.action';
import { selectUser } from '../state/user.selesctor';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser$= this.store.select(selectUser)
  constructor(private store: Store) {
    this.store.dispatch(UserAction.loadUser());

  }
}
