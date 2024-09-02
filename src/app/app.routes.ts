import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MemberListComponent} from "./members/memeber-list/member-list.component";
import {MemberDetailComponent} from "./members/member-detail/member-detail.component";
import {ListComponent} from "./list/list.component";
import {MessageComponent} from "./message/message.component";
import {guardGuard} from "./guards/guard.guard";
import {MemberEditComponent} from "./members/member-edit/member-edit.component";
import {preventUnsavedChangesGuard} from "./guards/prevent-unsaved-changes.guard";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: "always",
    canActivate: [guardGuard],
    children: [
      {path: 'members', component: MemberListComponent, canActivate: [guardGuard]},
      {path: 'members/:username', component: MemberDetailComponent},
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
      {path: 'lists', component: ListComponent},
      {path: 'messages', component: MessageComponent},
    ]
  },
  {path: '**', component: HomeComponent, pathMatch: "full"}
];
