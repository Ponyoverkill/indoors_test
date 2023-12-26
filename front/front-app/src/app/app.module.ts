import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import { HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ChatComponent} from "./components/chat/chat.component";
import {FootComponent} from "./components/foot/foot.component";
import {LeftComponent} from "./components/left/left.component";
import {MainComponent} from "./components/main/main.component";
import {TopComponent} from "./components/top/top.component";
import {ProfileComponent} from "./components/top/profile/profile.component";
import {KittenFormComponent} from "./components/main/forms/kitten-form/kitten-form.component";
import {ViewComponent} from "./components/main/view/view.component";
import {KittenComponent} from "./components/main/view/kitten-list/kitten/kitten.component";
import {KittenListComponent} from "./components/main/view/kitten-list/kitten-list.component";
import {KittenRetrieveComponent} from "./components/main/view/kitten-retrieve/kitten-retrieve.component";
import {routes} from "./app.routes";
import {LoginComponent} from "./components/top/profile/login/login.component";
import {RegisterComponent} from "./components/top/profile/register/register.component";
import {ProfileViewComponent} from "./components/top/profile/profile-view/profile-view.component";
import {CookieService} from "ngx-cookie-service"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import { MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";




@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    FootComponent,
    LeftComponent,
    MainComponent,
    TopComponent,
    ProfileComponent,
    KittenFormComponent,
    ViewComponent,
    KittenComponent,
    KittenListComponent,
    KittenRetrieveComponent,
    LoginComponent,
    RegisterComponent,
    ProfileViewComponent,
  ],
    imports: [
        RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatCardModule,
        MatTabsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  providers: [CookieService, MatDatepickerModule, MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
