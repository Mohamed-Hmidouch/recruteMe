import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header'; // Import HeaderComponent
import { FooterComponent } from './layout/footer/footer'; // Import FooterComponent

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent], // Add HeaderComponent and FooterComponent here
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('jobFinder');
}
