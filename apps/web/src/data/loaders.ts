/** Carrega uma trilha por ID a partir de arquivos locais.
 * Em produção, isso deve vir da API.
 */
import trackU1 from './tracks/ph/legislacao/u1_conceitos.json'
export function loadTrackById(id:string){ if(id==='LEG-U1-CONCEITOS') return trackU1; return trackU1 }
