import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  inject,
  Input
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators
} from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-custom-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-1.5 w-full mb-5 relative">
      <label [for]="inputId" class="text-sm font-medium tracking-wide transition-colors duration-200" [class]="labelClasses" >
        {{ label }}
        @if (isRequired) {
          <span class="text-rose-500 ml-0.5">*</span>
        }
      </label>
      <div>
        @if (iconSvg) {
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-300"
            [class]="iconClasses"
            [innerHTML]="iconSvg">
          </div>
        }
        <input 
          [id]="inputId"
          [type]="currentInputType"
          [placeholder]="placeholder"
          [formControl]="control"
          (focus)="isFocused = true"
          (blur)="isFocused = true"
          [class]="inputClasses"
        />
        @if (type === 'password') {
          <button 
            type="button"
            tabindex="-1"
            (click)="togglePassword()"
            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500
              hover:text-indigo-400 transition-colors focus:outline-none"
            aria-label="Toggle password visibility">
            @if (showPassword) {
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0l-3.29-3.29" />
              </svg>
            } @else {
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
          </button>
        }
      </div>
      <div class="h-5 mt-1 overflow-hidden">
        @if (isInvalid) {
          <span class="block text-sm font-medium text-rose-400 animate-slide-down">
            {{ errorMenssage }}
          </span>
        }
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to {opacity: 1; transform: translateY(0); }
    }
    .animate-slide-down {
      animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }  
  `],
  styleUrl: './custom-input.css',
})
export class CustomInput {
  // ! Inputs modernos usando signal (com fallbacks seguros contra NG0950) 
  @Input() inputId: string = 'default-id';
  @Input() label: string = 'Label';
  @Input() control: FormControl = new FormControl();
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() placeholder: string = '';
  @Input() iconSvg: string = '';

  // ! Estado local
  isFocused: boolean = false;
  showPassword: boolean = false;

  // ! Derivação Complexas Computadas (Subtituindo o ngClass e logicas soltas)
  get currentInputType() : string {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  get isRequired() : boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  };

  get isInvalid() : boolean { 
    const ctrl = this.control;
    if (!ctrl) {
      return false;
    }
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  };

  get labelClasses() : string {
    if (this.isInvalid) return 'text-rose-500';
    if (this.isFocused) return 'text-indigo-400';
    return 'text-slate-500';
  };

  get inputClasses() : string {
    let base = `w-full rounded-xl border border-slate-900/40 px-4 py-3.5 text-slate-200
      placeholder:text-slate-600 text-[15px] shadow-sm backdrop-blur-sm transition-all 
      duration-300 ease-in-out focus:bg-slate-900 focus:outline-none focus:ring-4 hover:bg-slate-900/60`;
    base += this.iconSvg ? 'pl-11' : '';
    base += this.type === 'password' ? 'pr-12' : '';

    if (this.isInvalid) {
      base += 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20'
    } else {
      base += 'border-slate-700/50 focus:border-indigo-500 focus:ring-indigo-500/20 hover:border-slate-600 ';
    }
    return base;
  };

  get iconClasses(): string{
    if (this.isInvalid) {
      return 'text-rose-400';
    }
    if (this.isFocused) {
      return 'text-indigo-400';
    }
    return 'text-slate-400'
  };

  get errorMenssage() : string {
    if (!this.control || !this.control.errors) return '';
    if (this.control.errors['required']) return 'Este campo é estritamente obrigatorio';
    if (this.control.errors['email']) return 'Insira um formato de e-mail corporativo valido';
    if (this.control.errors['minlength']) return `Necessario minimo ${this.control.errors['minlength']} caracteres`;
    return 'Entrada Invalida';
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
