import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from './domain/Cliente';
import { ClienteService } from '../service/cliente.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
  constructor(private service:ClienteService, private rota:ActivatedRoute){}

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

  //Put
  put():void{
    const id = Number(this.rota.snapshot.paramMap.get("id"))
    this.service.update(this.cliente, id)
    .subscribe(cliente => {
    
    // Obter index do vetor
    let posicao = this.clientes.findIndex(obj => {
      return obj.codigo == cliente.codigo;
    });

    // Alterando os dados da lista de clientes para alteração no front
    this.clientes[posicao] = cliente;

    // Visibilidade dos botões
    this.botaoCadastro = true;

    // Visibilidade da tabela
    this.tabela = true;

    // Mensagem
    alert('Cliente alterado com sucesso')

    })
  }


  //Select
  selecionarCliente(id:number): void{

    // Selecionar cliente
    this.cliente = this.clientes[id];

    //  Visibilidade dos botões
    this.botaoCadastro = false;

    // Visibilidade da tabela
    this.tabela = false;
  } 

  // Inicialização
  ngOnInit(){
    this.get();
  }
}
