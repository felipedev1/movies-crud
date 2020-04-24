import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { MatDialog } from '@angular/material';
import { Alerta } from './../../shared/models/alerta';
import { FilmesService } from './../../core/filmes.service';
import { Filme } from './../../shared/models/filme';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  id: number
  cadastro: FormGroup;
  generos: Array<string>

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private filmesService: FilmesService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) { }

  get f() {
    return this.cadastro.controls
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id']
    if(this.id){
      console.log('PASSOU AQUI')
      this.filmesService.vizualizar(this.id)
      .subscribe((filme: Filme)=> this.criarFormulario(filme))
    } else this.criarFilmeEmBranco()

    

    this.generos = ['Ação', 'Aventura', 'Animação', 'Comédia', 'Drama', 'Ficção Cientifica', 'Romance', 'Terror']

  }


  submit(): void {
    this.cadastro.markAllAsTouched()
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme
    if(this.id){
      filme.id = this.id
      this.editar(filme)
    } else {
      this.salvar(filme)
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset()
  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private criarFilmeEmBranco(): void {
    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo filme',
          possuiBtnFechar: true,
          corBtnCancelar: 'primary'
        } as Alerta
      }
      const dialogRef = this.dialog.open(AlertaComponent, config)
      dialogRef.afterClosed().subscribe((opcao: boolean)=>{
        if(opcao){
          this.router.navigateByUrl('filmes')
        } else {
          this.reiniciarForm()
        }
      })
    },
    ()=> {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tente novamente mais tarde.',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar',
        } as Alerta
      }
      this.dialog.open(AlertaComponent, config)
    })
  }

  private editar(filme: Filme): void {
    this.filmesService.editar(filme).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      }
      const dialogRef = this.dialog.open(AlertaComponent, config)
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('/filmes'))
    },
    ()=> {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tente novamente mais tarde.',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar',
        } as Alerta
      }
      this.dialog.open(AlertaComponent, config)
    })
  }

}
