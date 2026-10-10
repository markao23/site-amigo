import { Component } from '@angular/core';
import { LoginForm } from '../login-form/login-form';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginForm],
  template: `
    <main class="min-h-screen w-full flex items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),rgba(255,255,255,0))] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <!-- Elemento decorativo de fundo -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl opacity-30 pointer-events-none blur-[100px]">
         <div class="aspect-[2/1] w-full bg-gradient-to-b from-indigo-500/20 to-transparent"></div>
      </div>

      <!-- Card de Login -->
      <div class="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 sm:p-10 z-10">
        <div class="text-center mb-8">
          <div class="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
            <svg class="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white tracking-tight">Bem-vindo de volta</h1>
          <p class="text-sm text-slate-400 mt-2">Insira suas credenciais para acessar o painel</p>
        </div>
        
        <app-login-form></app-login-form>
        
        <p class="mt-6 text-center text-sm text-slate-400">
          Não tem uma conta? 
          <a href="#" class="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Registre-se agora</a>
        </p>
      </div>
    </main>
  `
})
export class LoginPageComponent {}