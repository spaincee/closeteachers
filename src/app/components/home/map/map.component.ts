import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import * as olProj from 'ol/proj';
import Rotate from 'ol/control/Rotate';
import { fromLonLat } from 'ol/proj';
import Control from 'ol/control/Control';
import { User } from 'src/app/interfaces/user.interface';
import { PublicService } from 'src/app/services/public.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: Map;
  private markerSource!: VectorSource;

  teacherLists: User[] = [];
  locations: any[]= [];


  constructor(private publicService: PublicService) { }

  async ngOnInit(): Promise<void> {

    const data = await this.publicService.getAll();
    this.teacherLists = data.teachers

    const baseLayer = new TileLayer({
      source: new OSM({
        attributions: [] // Eliminar la atribución
      })
    });
  
    this.markerSource = new VectorSource();
  
    const markerLayer = new VectorLayer({
      source: this.markerSource,
      style: new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          scale: 1.0, // Ajusta el valor para cambiar el tamaño de los marcadores (1.0 = tamaño original)
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

    this.addTeacherMarkers();
  }

  addTeacherMarkers(): void {
    this.teacherLists.forEach(teacher => {
      if(typeof teacher['location'] === 'string'){
        const locationString = JSON.parse(teacher['location']);
        const trimmedString = locationString.slice(1, -1);
        this.locations = trimmedString.split(',').map((location: String) => parseFloat(location.trim()));
      }
      const initialMarker = new Feature({
        geometry: new Point(fromLonLat([this.locations[1], this.locations[0]]))
      });
      this.markerSource.addFeature(initialMarker);
    })
  }
}
