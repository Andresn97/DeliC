import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AccesoGuard } from "./guards/acceso.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  // {
  //   path: "home",
  //   loadChildren: () =>
  //     import("./pages/home/home.module").then((m) => m.HomePageModule),
  // },
  { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" },
  {
    path: "registro",
    loadChildren: () =>
      import("./pages/registro/registro.module").then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: "recuperarpass",
    loadChildren: () =>
      import("./pages/recuperarpass/recuperarpass.module").then(
        (m) => m.RecuperarpassPageModule
      ),
  },
  {
    path: "seleccion",
    loadChildren: () =>
      import("./pages/seleccion/seleccion.module").then(
        (m) => m.SeleccionPageModule
      ),
  },
  {
    path: "inicio",
    loadChildren: "./pages/inicio/inicio.module#InicioPageModule",
    canActivate: [AccesoGuard],
  },
  {
    path: "local",
    loadChildren: () =>
      import("./pages/local/local.module").then((m) => m.LocalPageModule),
  },
  {
    path: "local/:nombreLocal",
    loadChildren: () =>
      import("./pages/local/local.module").then((m) => m.LocalPageModule),
  },
  {
    path: "perfil-vendedor",
    loadChildren: () =>
      import("./pages/perfil-vendedor/perfil-vendedor.module").then(
        (m) => m.PerfilVendedorPageModule
      ),
  },
  {
    path: "registro-local",
    loadChildren: () =>
      import("./pages/registro-local/registro-local.module").then(
        (m) => m.RegistroLocalPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
