import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
id: number;

  constructor(public service: ServiceService,  private route: ActivatedRoute , private router: Router) {
    // console.log('ruta padre ' + this.route.snapshot.paramMap.get( 'id' ));
    const parametro =  this.route.snapshot.paramMap.get( 'id' );
    this.id = Number(parametro);
  }

  onClick(){
    // console.log('dio click');
    this.router.navigateByUrl('/');
  }

}
