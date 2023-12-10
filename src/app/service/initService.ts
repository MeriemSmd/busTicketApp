import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client } from "../dto/client";
import { Observable } from "rxjs";
import { Bus } from "../dto/bus";
@Injectable({
    providedIn: 'root'
})
export class InitService {
    constructor(private httpClient: HttpClient) { }

    getCurrentUser(): Observable<Client> {
        return this.httpClient.get<Client>('assets/client.json')
    }
    getBuses(): Observable<Bus[]> {
        return this.httpClient.get<Bus[]>('assets/bus.json')
    }
}