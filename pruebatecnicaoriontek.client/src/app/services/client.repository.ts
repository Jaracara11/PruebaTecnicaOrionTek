import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class ClientRepository {
  private apiUrl = 'https://localhost:5000/api/client';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientById(clientId: number): Observable<Client | null> {
    return this.http.get<Client>(`${this.apiUrl}/${clientId}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
  }

  getClientAddresses(clientId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/${clientId}/addresses`);
  }

  addAddressToClient(clientId: number, address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/${clientId}/addresses`, address);
  }
}