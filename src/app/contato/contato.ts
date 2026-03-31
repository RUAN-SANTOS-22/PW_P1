import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContatoModel } from '../model/contato';

@Component({
  selector: 'app-contato',
  imports: [FormsModule, CommonModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  public alerta: string = "";
  public obj: ContatoModel = new ContatoModel();

  public enviar() {
    let json = JSON.stringify(this.obj);
    localStorage.setItem("meuContato", json);
    this.alerta = "Sua mensagem foi enviada com sucesso!";
    
    // Limpar formulário após envio
    this.obj = new ContatoModel();
  }
}

// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Cliente } from '../model/cliente';

// @Component({
//   selector: 'app-contato',
//   imports: [FormsModule, CommonModule],
//   templateUrl: './contato.html',
//   styleUrl: './contato.css',
// })

// export class Contato {
//   public mensagem : String = "";
//   public titulo: String = "";
//   public nome: String = "";
//   public telefone: String = "";
//   public email:String = "";
//   public texto:String = "";
//   public copia:String="";

//   public obj:Cliente = new Cliente();

//   public enviar(){
//       this.mensagem = "A sua mensagem foi enviada com sucesso!";
//       let corpoMensagem = "titulo="+ this.titulo + ", "+
//                           "nome="+ this.nome + ", "+
//                           "email="+ this.email + ", "+
//                           "copia="+ this.copia + ", "+
//                           "telefone="+ this.telefone + ", "+
//                           "texto="+ this.texto ;
//       localStorage.setItem("mensagemContato", corpoMensagem);

//       this.obj.nome = this.nome;
//       this.obj.email = this.email;
//       this.obj.telefone = this.telefone;

//       let json = JSON.stringify(this.obj);
//       localStorage.setItem("cliente", json);
//   }

// }


// import { Component } from '@angular/core';
// import { ContatoModel } from '../model/contato';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-contato',
//   imports: [FormsModule],
//   templateUrl: './contato.html',
//   styleUrl: './contato.css',
// })
// export class Contato {
//     public alerta:String = "";
//     public obj : ContatoModel = new ContatoModel();
//     public enviar(){
//       let json = JSON.stringify(this.obj);
//       localStorage.setItem("meuContato", json);
//       this.alerta = "Seu email foi enviado com sucesso !";
//     }
// }
