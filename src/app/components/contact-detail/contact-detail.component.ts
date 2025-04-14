import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common'; // Necessário para *ngIf

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit {
  contato?: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contato = this.contactService.getContatoById(id);
  }
}
