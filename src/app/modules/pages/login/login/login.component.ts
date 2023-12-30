import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../services/autenticacao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/modules/models/globals/LoginRequest';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  realizaLoginSubscription$: Subscription;

  constructor(
    public autenticacaoService: AutenticacaoService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.autenticacaoService.isAuthenticated()) localStorage.clear();;
  }

  ngOnDestroy(): void {
    if (this.realizaLoginSubscription$ != undefined) this.realizaLoginSubscription$.unsubscribe();
  }

  realizaLogin() {
    this.realizaLoginSubscription$ = this.autenticacaoService.realizaLogin(
      this.autenticacaoService.formLogin.get('cpf')?.value,
      this.autenticacaoService.formLogin.get('senha')?.value).subscribe(
        {
          next: (response: any) => {
            this.autenticacaoService.successfullLogin(JSON.stringify(response.headers.get('Authorization')));
          },
          error: () => {
          },
          complete: () => {
            this.router.navigate(['/painel']);
            this._snackBar.open('Login realizado com sucesso', 'Fechar', {
              duration: 3500
            })
          }
        }
      )
  }

}
