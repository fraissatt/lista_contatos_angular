import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { AgendaListComponent } from './components/agenda-list/agenda-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/contatos', pathMatch: 'full' },
  { path: 'contatos', component: ContactListComponent },
  { path: 'contatos/novo', component: ContactFormComponent },
  { path: 'contatos/:id', component: ContactDetailComponent },
  { path: 'favoritos', component: ContactListComponent },
  { path: 'agenda', component: AgendaListComponent },
];
