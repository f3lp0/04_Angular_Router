import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// Pages
import { NotFoundComponent } from './not-found/not-found.component';

// Services
import { CustomPreloadService } from './services/custom-preload.service';

// Externals
import { QuicklinkStrategy } from 'ngx-quicklink';

// guards
import { AdminGuard } from './guards/admin.guard';

// se crean reglas en este array
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    }
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // este sería si se quieren precargar todos los módulos
    // preloadingStrategy: PreloadAllModules

    // Si solo se quieren cargar algunos es:
    // preloadingStrategy: CustomPreloadService

    // Si se quiere precargar linkRoutes del ViewPort:
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
