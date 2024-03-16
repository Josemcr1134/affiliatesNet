import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public affiliate_menu:boolean =  false;
  public mobile_menu:boolean = false;
  public changePassword:boolean = false;
  public samePassword:boolean = true;
  public password:string = '';
  public password2:string = '';
  public first_name:string = '';
  public last_name:string = '';
  public avatar:any;
  public email:string = '';

  constructor(private authSvc:AuthService) { }

  ngOnInit(): void {
    this.first_name = sessionStorage.getItem('first_name') || '';
    this.last_name = sessionStorage.getItem('last_name') || '';
    this.avatar = sessionStorage.getItem('avatar') ;
    this.email = sessionStorage.getItem('email') || '';
    console.log(this.avatar)
  }



  showHideAffiliate_menu(){
    this.affiliate_menu = !this.affiliate_menu;
  };

  showMobileMenu() {
    this.mobile_menu = !this.mobile_menu;
  };
  ShowChangePasswordModal(){
    this.changePassword = !this.changePassword;
  };

  VerifySamePasswords(){
    if (this.password === this.password2) {
        return this.samePassword = true;
    } else {
      return this.samePassword = false;
    };
  };

  ChangePassword(){
    const body = {
      new_password1: this.password,
      new_password2: this.password2
    };

    this.authSvc.ChangePassword(body)
            .subscribe({
              error:(err:any) => {
                console.log(err);
                Swal.fire('Oooops', 'La contraseña no cumple con los criterios de seguridad, intente', 'error');
              },
              next:(resp:any) => {
                Swal.fire('Éxito', 'Contraseña creada correctamente', 'success');
                this.changePassword = !this.changePassword;
                this.password = '';
                this.password2 = '';
              }
            })

  }
}
