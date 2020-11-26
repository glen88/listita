import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ServiceService } from './services/service.service';
// IMPORTAMOS LO QUE VAMOS A UTILIZAR DE ADMOB.
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent  {

        // // CONFIGURACION DEL BANNER
        // bannerConfig: AdMobFreeBannerConfig = {
        //   autoShow: true, // ,
        //   // isTesting: true,
        //   // bannerAtTop: true,
        //   // overlap: true,
        //   id: 'ca-app-pub-1449864164151196/3079274155'
        //  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
    // private admobFree: AdMobFree
  ) {
    this.initializeApp();
    // this.service.MostrarBanner();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //  console.log('promesa ready');
      // this.admobFree.banner.config(this.bannerConfig);
    });
  }




}
