import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPagina = 4
  filmes: Filme[] = []
  pagina = 0

  constructor(private filmesService: FilmesService) { }

  ngOnInit(): void {
    this.listarFilmes()
  }

  onScroll(): void {
    this.listarFilmes()
  }

  private listarFilmes(): void {
    this.pagina++
    this.filmesService.listar(this.pagina, this.qtdPagina)
      .subscribe((filmes: Filme[])=> this.filmes.push(...filmes))

  }
}
