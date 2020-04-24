import { CamposModule } from './../shared/components/campos/campos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { MaterialModule } from '../shared/material/material.module';
import { CadastroFilmesComponent } from './cadastro-filmes/cadastro-filmes.component';
import { ListagemFilmesComponent } from './listagem-filmes/listagem-filmes.component';
import { VizualizarFilmesComponent } from './vizualizar-filmes/vizualizar-filmes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    InfiniteScrollModule,
    CamposModule
  ],
  declarations: [CadastroFilmesComponent, ListagemFilmesComponent, VizualizarFilmesComponent]
})
export class FilmesModule { }
