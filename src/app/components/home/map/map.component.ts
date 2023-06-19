import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import Control from 'ol/control/Control';
import { User } from 'src/app/interfaces/user.interface';
import { PublicService } from 'src/app/services/public.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  private map!: Map;
  private markerSource: VectorSource = new VectorSource();

  teacherLists: User[] = [];
  locations: any[] = [];
  coordinates: any[] = [];
  myMarker? : any 

  @Input() lista: any[] = [];

  constructor() { }

  async ngOnInit(): Promise<void> {

    const baseLayer = new TileLayer({
      source: new OSM({
        attributions: []
      })
    });
  
    const markerLayer = new VectorLayer({
      source: this.markerSource 
    });
  
    this.map = new Map({
      target: 'map',
      layers: [baseLayer, markerLayer],
      view: new View({
        center: fromLonLat([-75.5744, 6.2509]),
        zoom: 3
      })
    });
  
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'Restablecer';
    resetButton.addEventListener('click', () => {
      this.map.getView().setCenter(fromLonLat([-75.5744, 6.2509]));
      this.map.getView().setZoom(3);
    });

    const myLocation = document.createElement('button');
    myLocation.innerHTML = '<i class="fa-solid fa-location-crosshairs fs-4"></i>';
    myLocation.classList.add('btn');
    myLocation.addEventListener('click', async () => {
      try {
        this.coordinates = await this.getGeolocation();
        this.addMyLocation(this.coordinates);
        this.map.getView().setCenter(fromLonLat(this.coordinates));
        this.map.getView().setZoom(15);
      } catch (error) {
        console.error('Error al obtener la geolocalización:', error);
      }
    });

    const resetControl = new Control({
      element: resetButton
    });

    const myLocationControl = new Control({
      element: myLocation
    });
  
    this.map.addControl(resetControl);
    this.map.addControl(myLocationControl);
    
  }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['lista']) {
        this.teacherLists = changes['lista'].currentValue;
        
        this.addTeacherMarkers();
      } 
    }

  async getGeolocation(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords: any[] = [position.coords.longitude, position.coords.latitude];
            resolve(coords);
          },
          (error) => {
            console.error('Error al obtener la geolocalización:', error);
            reject(error);
          }
        );
      } else {
        console.error('Geolocalización no disponible');
        reject(new Error('Geolocalización no disponible'));
      }
    });
  }

  addMyLocation(coords: any[]): void {
    this.myMarker = new Feature({
      geometry: new Point(fromLonLat(coords))
    });

    const myMarkerStyle = new Style({
      image: new Icon({
        src: './assets/images/pin_red.png',
        scale: 0.12,
        anchor: [0.5, 1],
      })
    });

    this.myMarker.setStyle(myMarkerStyle);
    this.markerSource.addFeature(this.myMarker);
  
    this.map.getView().setCenter(fromLonLat(coords));
    this.map.getView().setZoom(10);
  }

  addTeacherMarkers(): void {  
    this.markerSource.clear();

    this.teacherLists.forEach(teacher => {
      if(typeof teacher['location'] === 'string'){
        const result = JSON.parse(teacher['location']);
        if(typeof result === 'string'){
          const trimmedString = result.slice(1, -1);
          this.locations = trimmedString.split(',').map((location: String) => parseFloat(location.trim()));
        }
        if(typeof result === 'object'){
          this.locations = result;
        }
      }

      const teacherMarker = new Feature({
        geometry: new Point(fromLonLat([this.locations[1], this.locations[0]]))
      });

      const teacherMarkerStyle = new Style({
        image: new Icon({
          src: './assets/images/teacher_pin.png',
          scale: 0.3,
          anchor: [0.5, 1],
        })
      });
      teacherMarker.setStyle(teacherMarkerStyle);
      this.markerSource.addFeature(teacherMarker);
    })
    
  }

  
}

