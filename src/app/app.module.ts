import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FaceComponent } from './components/face/face.component';
import { InvisibleSliderDirective } from './directives/invisible-slider.directive';

@NgModule({
  declarations: [
    AppComponent,
    FaceComponent,
    InvisibleSliderDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
