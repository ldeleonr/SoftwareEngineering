import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicios } from '../../servicios/servicios.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  constructor(
    private fb: FormBuilder,
    private servicios: Servicios) { }

  ngOnInit(): void {
  }

  onSubmit() {
      // TODO: Use EventEmitter with form value
      console.log(this.loginForm.value);
    }

    validarUsuario() {
     /*  this.loginForm.patchValue({
        username: 'Nancy',
        password: 'Nancy'
      }); */
     const login = {
        usuario: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
     // tslint:disable-next-line: no-shadowed-variable
     const res = this.servicios.getLogin(login).subscribe(res => {
        console.log(res);
        if (res.respuesta === true) {
          console.log('login', 'OK');
          const resp = this.servicios.getRol(res.id).subscribe(respuesta=>{
              console.log(respuesta);
          });
        } else {
          console.log('login', 'FAIL');
        }
      });
    }
}
