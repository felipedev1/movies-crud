import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';4
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'dio-vizualizar-filmes',
  templateUrl: './vizualizar-filmes.component.html',
  styleUrls: ['./vizualizar-filmes.component.scss']
})
export class VizualizarFilmesComponent implements OnInit {

  filme: Filme
  
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg'

  constructor(private activatedRoute: ActivatedRoute,
              private fimesService: FilmesService) { }

  ngOnInit() {
    this.vizualizar(this.activatedRoute.snapshot.params['id'])
  }

  private vizualizar(id: number): void {
    this.fimesService.vizualizar(id).subscribe((filme: Filme)=> this.filme = filme)
  }
}
