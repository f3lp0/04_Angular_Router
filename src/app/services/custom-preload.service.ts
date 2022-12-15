import { Injectable, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy {

  constructor() { }

  preload(route: Route, load: ()=> Observable<any>): Observable<any> {
    // Si hay flag preload, se carga después del render inicial
    if (route.data && route.data['preload']) {
      return load();
    }
    // Sino se retorna observable en vacío
    return of(null)
  }
}
