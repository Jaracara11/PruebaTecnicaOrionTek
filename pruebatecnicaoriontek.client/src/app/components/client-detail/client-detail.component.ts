import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
})
export class ClientDetailComponent {
  client: Client = { id: null, addresses: [], name: '', email: '', phone: '' }; // Initialize with default properties
  addresses: Address[] = [];
  newAddress: Address = { houseNumber: '', street: '', city: '' }; // Initialize newAddress
  isEditMode: boolean = false;
  isNewClient: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.clientService.getClientById(Number(clientId)).subscribe(data => {
        this.client = data ?? { id: null, addresses: [], name: '', email: '', phone: '' }; // Handle potential null
      });
      this.clientService.getClientAddresses(Number(clientId)).subscribe(data => {
        this.addresses = data;
        console.log(JSON.stringify(this.addresses, null, 2))
      });
    } else {
      this.isEditMode = true;
      this.isNewClient = true;
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onSubmit() {
    if (this.isNewClient) {
      this.clientService.addClient(this.client).subscribe({
        next: () => {
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error('Error adding client:', err);
        }
      });
    } else {
      this.clientService.updateClient(this.client).subscribe({
        next: () => {
          this.isEditMode = false;
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error('Error updating client:', err);
        }
      });
    }
  }

  addAddress() {
    if (this.client.id) {
      this.clientService.addAddressToClient(this.client.id, this.newAddress).subscribe({
        next: (address) => {
          this.addresses.push(address);
          this.newAddress = { houseNumber: '', street: '', city: '' };
        },
        error: (err) => {
          console.error('Error adding address:', err);
        }
      });
    } else {
      console.error('Cannot add address: Client ID is not available.');
    }
  }
}