import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Champion {
    private url = 'https://ddragon.leagueoflegends.com/cdn/14.18.1/data/en_US/champion.json';

    constructor(private http: HttpClient) {}

    getChampions(): Observable<any[]> {
      return this.http.get<any>(this.url).pipe(
        map(data => {
          // Convert object into array with champion name, image, id and class/es
          return Object.values(data.data).map((champ: any) => ({
            name: champ.name,
            img: `https://ddragon.leagueoflegends.com/cdn/14.18.1/img/champion/${champ.image.full}`,
            id: champ.id,
            tags: champ.tags ?? []
          }));
        })
      );
    }
}

export interface Champion {
  name: string;
  img: string;     // 👈 this MUST be here
  id: string;
  tags: string[];
}

