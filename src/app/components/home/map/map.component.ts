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
  locations: any[]= [];

  @Input() lista: any[] = [];

  constructor(
    private publicService: PublicService) { 
    }

  async ngOnInit(): Promise<void> {

    const baseLayer = new TileLayer({
      source: new OSM({
        attributions: []
      })
    });
  
    this.markerSource = new VectorSource();
  
    const markerLayer = new VectorLayer({
      source: this.markerSource,
      style: new Style({
        image: new Icon({
          // src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          src: './assets/images/placeholder.png',
          scale: 0.12, 
          anchor: [0.5, 1],
        })
      })
    });
  
    this.map = new Map({
      target: 'map',
      layers: [baseLayer, markerLayer],
      view: new View({
        center: fromLonLat([-75.5744, 6.2509]),
        zoom: 15
      })
    });
  
    const initialMarker = new Feature({
      geometry: new Point(fromLonLat([-75.5744, 6.2509]))
    });
    this.markerSource.addFeature(initialMarker);
  
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'Restablecer';
    resetButton.addEventListener('click', () => {
      this.map.getView().setCenter(fromLonLat([-75.5744, 6.2509]));
      this.map.getView().setZoom(15);
    });
  
    const resetControl = new Control({
      element: resetButton
    });
  
    this.map.addControl(resetControl);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lista']) {
      this.teacherLists = changes['lista'].currentValue;
      
      this.addTeacherMarkers();

    }
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

      const initialMarker = new Feature({
        geometry: new Point(fromLonLat([this.locations[1], this.locations[0]]))
      });
      this.markerSource.addFeature(initialMarker);
    })
  }

  
}

