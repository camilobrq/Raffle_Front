import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/Services/auth-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  rol?: string = '';
  @ViewChild('drawer') drawer?: MatSidenav;
  authService: any;
  username?: string = '';

  constructor(private route: Router, private user: AuthService) {

  }

  ngOnInit(): void {
    this.rol = this.user.user?.userInfo?.role;
    this.username = this.user.user?.userInfo?.username;
    console.log(this.rol)
  }
  datoAlmacenado = this.user.user?.userInfo?.username;
  private breakpointObserver = inject(BreakpointObserver);
  variable = this.datoAlmacenado;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
 
  get storedData(): string {
    return `/#`;
  }
  logOut() {
    this.user.logout();
    this.route.navigate(['/SignIn']);
  }
  adjustTitlePosition(opened: boolean): void {
    const welcomeTitle = document.getElementById('welcomeTitle');
    if (welcomeTitle) {
      welcomeTitle.style.marginLeft = opened ? '160px' : '0'; // Ajusta el valor según el ancho de tu menú
    }
  }
  closeMenu() {
    // Cierra el menú
    this.drawer?.toggle();
  }
}
