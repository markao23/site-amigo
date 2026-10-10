import { Component, inject } from '@angular/core';
import { FormBuilder, Validator, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomButton } from '../../components/ui/custom-button/custom-button';
import { CustomInput } from '../../components/ui/custom-input/custom-input';

@Component({
  imports: [ReactiveFormsModule, CustomButton, CustomInput],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubimit()" class="w-full">
      <app-custom-input
        id="email"
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        [control]="loginForm.controls.email"
      ></app-custom-input>
      <app-custom-input
        id="password"
        label="Senha"
        type="password"
        placeholder="••••••••"
        [control]="loginForm.controls.password"
      ></app-custom-input>
      <div class="flex items-center justify-between mb-6 text-sm">
        <label class="flex items-center gap-2 text-slate-300 cursor-pointer">
          <input type="checkbox" class="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500/50" />
          Lembrar-me
        </label>
        <a href="#" class="text-indigo-400 hover:text-indigo-300 transition-colors">Esqueceu a senha?</a>
      </div>
      <app-custom-button 
        type="submit" 
        text="Entrar na plataforma"
        [disabled]="loginForm.invalid"
      ></app-custom-button>
    </form>
  `,
  selector: 'app-login-form',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private fb = inject(FormBuilder);
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubimit() {
    if (this.loginForm.valid) {
      console.log('Dados Login: ', this.loginForm.getRawValue());
    }
  }
}
