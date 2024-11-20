import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

export type WelcomeMessageRequest = {
  shouldThrow: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public getWelcomeMessage(req?: WelcomeMessageRequest): Observable<string> {
    return of('Welcome to my app!').pipe(
      delay(2500),
      map((value) => {
        if (req?.shouldThrow) {
          throw new Error();
        }

        return value;
      }),
    );
  }
}
