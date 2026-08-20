import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EnviarDatos {

    private disparadorSubject = new BehaviorSubject<any>(null);
    public disparador = this.disparadorSubject.asObservable();

    constructor(){}

    enviar(empleadoData: any) {
        this.disparadorSubject.next(empleadoData);
    }
}
