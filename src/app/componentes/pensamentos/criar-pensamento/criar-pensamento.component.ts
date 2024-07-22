import { Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      autoria: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      modelo: ['modelo1'],
    });
  }

  criarPensamento() {
    console.log(this.formulario.get('autoria')?.errors);
    if (this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }

}

// Validators.min()

// Validador que exige que o valor do controle seja maior ou igual ao número fornecido.
// Validators.max()

// Validador que exige que o valor do controle seja menor ou igual ao número fornecido.
// Validators.requiredTrue()

// Validador que exige que o valor do controle seja verdadeiro. Este validador é comumente usado para caixas de seleção obrigatórias.
// Validators.email()

// Validador que exige que o valor do controle passe em um teste de validação de email.
// Validators.maxLength()

// Validador que exige que o comprimento do valor do controle seja menor ou igual ao tamanho máximo fornecido.
// Validators.nullValidator()

// Validador de valores nulos.
// Validators.composeAsync()

// Compõe vários validadores assíncronos em uma única função que retorna a união dos objetos de erro individuais para o controle fornecido.
