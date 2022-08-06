import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public REST_API_SERVER = 'http://localhost:8000';

  constructor() { }
}
