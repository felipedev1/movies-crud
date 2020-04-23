import { MatDialog } from '@angular/material';
import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';4
import { ActivatedRoute, Router } from '@angular/router'
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-vizualizar-filmes',
  templateUrl: './vizualizar-filmes.component.html',
  styleUrls: ['./vizualizar-filmes.component.scss']
})
export class VizualizarFilmesComponent implements OnInit {

  filme: Filme
  id: number
  
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg'

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private filmesService: FilmesService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id']
    this.vizualizar()
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certeza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuiBtnFechar: true,
      } as Alerta
    }
    const dialogRef = this.dialog.open(AlertaComponent, config)
    dialogRef.afterClosed().subscribe((opcao: boolean)=>{
      if(opcao){
        this.filmesService.excluir(this.id).subscribe(()=> this.router.navigateByUrl('/filmes'))
      }
    })
  }

  private vizualizar(): void {
    this.filmesService.vizualizar(this.id).subscribe((filme: Filme)=> this.filme = filme)
  }
}
