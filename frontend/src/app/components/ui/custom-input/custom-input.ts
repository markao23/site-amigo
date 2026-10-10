import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-custom-input',
  standalone: true,
  template: `
    <div class="flex flex-col gap-1.5 mb-4">
      <label [for]="id" class="text-sm font-medium text-slate-300">{{ label }}</label>
      <input 
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [formControl]="control"
        class="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-indigo-500 transition-all duration-200"
      />
    </div>
  `,
  styleUrl: './custom-input.css',
})
export class CustomInput {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) control!: FormControl;
  @Input() type = 'text';
  @Input() placeholder = '';
}
