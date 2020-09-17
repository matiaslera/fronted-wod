import {NgModule}  from '@angular/core'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({

    imports:[
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatRadioModule,
        MatInputModule,
        MatFormFieldModule,
    ],

    exports:[
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatRadioModule,
        MatInputModule,
        MatFormFieldModule,
    ]
})

export class MaterialModule {}