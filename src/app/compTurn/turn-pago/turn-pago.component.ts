import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { retry } from 'rxjs/operators';
import { Turno } from 'src/app/domain/turno';
import { TrabajoService } from 'src/app/services/trabajo/trabajo.service';


@Component({
  selector: 'app-turn-pago',
  templateUrl: './turn-pago.component.html',
  styleUrls: ['./turn-pago.component.css']
})
export class TurnPagoComponent implements OnInit {

  turno:Turno
  idTurno:number
  constructor(private route: ActivatedRoute,private jobService: TrabajoService,private window: Window) { 
    /* var mercadopago = require('mercadopago');
    mercadopago.configure({
        access_token: 'TEST-6590390036249147-120205-df8dbbdce5653e53c78f05d5c5e1301e-146617094'
    }); */
    //window.Mercadopago.setPublishableKey("YOUR_PUBLIC_KEY");
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.loadJob(routeParams.id)     
      this.idTurno=routeParams.id 
    })
  
  }

  async loadJob(id){
    this.turno = await this.jobService.leerTurno(id)
    console.log(this.turno)
  }

}

/* function algo(){
  var mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: 'TEST-6590390036249147-120205-df8dbbdce5653e53c78f05d5c5e1301e-146617094'
});
} */