import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { Address } from '../models/address.model';
import { ClientRepository } from './client.repository';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private clientRepository: ClientRepository) { }

  getClients(): Observable<Client[]> {
    return this.clientRepository.getClients();
  }

  getClientById(clientId: number): Observable<Client | null> {
    return this.clientRepository.getClientById(clientId);
  }

  addClient(client: Client): Observable<Client> {
    return this.clientRepository.addClient(client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.clientRepository.updateClient(client);
  }

  getClientAddresses(clientId: number): Observable<Address[]> {
    return this.clientRepository.getClientAddresses(clientId);
  }

  // Add this method
  addAddressToClient(clientId: number, address: Address): Observable<Address> {
    return this.clientRepository.addAddressToClient(clientId, address);
  }
}