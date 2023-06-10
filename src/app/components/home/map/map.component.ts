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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: Map;
  private markerSource!: VectorSource;

  constructor() { }

  ngOnInit(): void {
    const baseLayer = new TileLayer({
      source: new OSM()
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
        center: olProj.fromLonLat([-73.100836, 7.067076]),
        zoom: 15
      })
    });

    const initialMarker = new Feature({
      geometry: new Point(olProj.fromLonLat([-73.100836, 7.067076]))
    });
    this.markerSource.addFeature(initialMarker);
  }

  addRandomMarkers(): void {
    for (let i = 0; i < 10; i++) {
      const randomLon = -73.100836 + Math.random() * 0.01;
      const randomLat = 7.067076 + Math.random() * 0.01;
      const marker = new Feature({
        geometry: new Point(olProj.fromLonLat([randomLon, randomLat]))
      });
      this.markerSource.addFeature(marker);
    }
  }
}
