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

  // Objeto Cliente
  cliente = new Cliente();

  //Visibilidade de botões
  botaoCadastro:boolean = true; 

  // Json Clientes
  clientes:Cliente[] = [];

  // Visibilidade da tabela
  tabela: boolean = true;

  //Construtor do service
  constructor(private service:ClienteService){}

  //Get
  get(): void {
     this.service.findAll()
     .subscribe(ListaClientes => this.clientes = ListaClientes);
  }

  //Post
  post(): void {
    this.service.save(this.cliente)
    .subscribe(cliente => { 
      // Cadastrando cliente no vetor do front
      this.clientes.push(cliente);

      //Limpar Formulário
      this.cliente = new Cliente(); 

      // Mensagem
      alert('Cliente cadastrado com sucesso')

     });
  }

  // Inicialização
  ngOnInit(){
    this.get();
  }
}
