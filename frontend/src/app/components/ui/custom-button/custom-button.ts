import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  styleUrl: './custom-button.css',
  template: `
    <button [type]="type" [disabled]="disabled" class="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md shadow-indigo-900/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200">
      {{ text }}
    </button>
  `
})
export class CustomButton {
  @Input({ required: true }) text!: string;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
}
