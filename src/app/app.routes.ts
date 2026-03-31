import { Routes } from '@angular/router';
import { Contato } from './contato/contato';
import { Vitrine } from './vitrine/vitrine';
import { CadastroCliente } from './cadastro-cliente/cadastro-cliente';
import { Cesta } from './cesta/cesta';
import { Detalhe } from './detalhe/detalhe';

export const routes: Routes = [
    {path:"cadastro", component:CadastroCliente},
    {path:"fale", component:Contato},
    {path:"vitrine", component:Vitrine},
    {path:"", component:Vitrine},
    {path:"cesta", component:Cesta},
    {path:"detalhe", component:Detalhe}
];
