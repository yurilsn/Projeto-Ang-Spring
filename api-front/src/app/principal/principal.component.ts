import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from './domain/Cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {


  //Visibilidade de botões
  botaoCadastro:boolean = true; 

  // Json Clientes
  clientes:Cliente[] = [];

  //Construtor do service
  constructor(private service:ClienteService){}

  //Get
  get(): void {
     this.service.findAll()
     .subscribe(ListaClientes => this.clientes = ListaClientes);
  }

  // Inicialização
  ngOnInit(){
    this.get();
  }
}
