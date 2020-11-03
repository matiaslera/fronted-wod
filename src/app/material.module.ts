import {NgModule}  from '@angular/core'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog'
import {MatDividerModule} from '@angular/material/divider'
@NgModule({

    imports:[
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatRadioModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSnackBarModule,
        MatDialogModule,
        MatDividerModule,
    ],

    exports:[
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatRadioModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSnackBarModule,
        MatDialogModule,
        MatDividerModule,
    ]
})

export class MaterialModule {}