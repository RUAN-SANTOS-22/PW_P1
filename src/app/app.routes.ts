import { Routes } from '@angular/router';
import { Contato } from './contato/contato';
import { Vitrine } from './vitrine/vitrine';
import { CadastroCliente } from './cadastro-cliente/cadastro-cliente';
import { Cesta } from './cesta/cesta';
import { Detalhe } from './detalhe/detalhe';
import { Login } from './login/login';
import { Busca } from './busca/busca'; 

export const routes: Routes = [
    {path:"cadastro", component:CadastroCliente},
    {path:"fale", component:Contato},
    {path:"vitrine", component:Vitrine},
    {path:"", component:Vitrine},
    {path:"cesta", component:Cesta},
    {path:"detalhe", component:Detalhe},
    {path:"login", component:Login},
    {path:"busca", component:Busca}
];
