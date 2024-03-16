import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username:string = '';
  public password:string ='';
  public emailStatus:boolean = true;
  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    localStorage.clear();
  }
  Login(){
    const fd = new FormData()
    fd.append('username', this.username);
    fd.append('email', this.username);
    fd.append('password', this.password);

    this.authSvc.Login(fd)
          .subscribe({
            error:(error:any) => {
              console.log(error);
              Swal.fire('Ooops', 'Usuario o contraseña con incorrectos', 'error');
            },
            next:(resp:any) => {
              console.log(resp)
              if (resp.user.status !== 'disabled' && resp.user.user_type === 5) {
                sessionStorage.setItem('net_token', resp.token);
                sessionStorage.setItem('username', resp.user.username);
                sessionStorage.setItem('email', resp.user.email);
                sessionStorage.setItem('first_name', resp.user.first_name);
                sessionStorage.setItem('last_name', resp.user.last_name);
                sessionStorage.setItem('avatar', resp.user.avatar);
                sessionStorage.setItem('uid', resp.user.id);
                this.router.navigateByUrl('/Home');
              } else {
                localStorage.clear();
                Swal.fire({
                  icon: 'error',
                  title: 'Ooooops...',
                  text: 'Has sido deshabilitado por netcare',
                });
              };
            }
          });
  };

  validateEmail() {
    return this.emailStatus = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.username);
  }
}
