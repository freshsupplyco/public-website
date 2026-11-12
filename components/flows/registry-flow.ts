import type {Flow} from './flow-data';
export const registryFlow:Flow={
 label:'Project evidence to digital credit lifecycle',
 summary:'Explore the target registry workflow: connect project records and human review with issuance, ownership and retirement through FSCO Stack.',
 lanes:['REGISTRY EXPERIENCE','FSCO STACK','REVIEW & LEDGER'],
 disclaimer:'Illustrative target workflow. Issuance, transfer and retirement integrations are scoped for each registry implementation. Animation speed does not represent processing time.',
 nodes:{
  app:{title:'Registry app',subtitle:'Environmental Registry'},
  gateway:{title:'Identity & evidence',subtitle:'Access, documents and metadata'},
  wallet:{title:'Credit holders',subtitle:'Wallets and ownership'},
  service:{title:'Registry workflow',subtitle:'Records and orchestration'},
  network:{title:'Credit contracts',subtitle:'On-chain credit lifecycle'},
  partner:{title:'Registry reviewers',subtitle:'Verification and approval'}
 },
 steps:[
  {title:'Register a project',action:'The project proponent submits the project, methodology and catchment information.',platform:'Identity, document and metadata services connect the application to its supporting records.',result:'A project record provides the reference for review and future credit activity.',from:'app',to:'gateway',route:'M260 120 H390',kind:'request',tag:'Project & supporting records',status:'Project submitted'},
  {title:'Review & approve',action:'Verifiers provide supporting evidence and the registry administrator assesses the application.',platform:'The workflow presents documents and methodology information to authorised reviewers and records their decision.',result:'Only an approved issuance proceeds to the credit-creation stage in this target flow.',from:'gateway',to:'partner',route:'M610 120 H680 Q700 120 700 140 V180 Q700 200 720 200 H830 Q850 200 850 220 V240',kind:'request',tag:'Evidence for human review',status:'Review decision recorded'},
  {title:'Issue credits',action:'The administrator authorises credit issuance against the approved project.',platform:'The target integration connects the issuance instruction to FSCO contract and chain services, with the required wallet permissions.',result:'The digital credit record links back to the project and issuance evidence.',from:'service',to:'network',route:'M500 240 V220 Q500 200 520 200 H830 Q850 200 850 180 V160',kind:'request',tag:'Approved issuance instruction',status:'Credit issuance recorded'},
  {title:'Transfer holdings',action:'A credit holder requests a transfer to another permitted holder.',platform:'Wallet and contract services would execute the permitted credit movement and return the transaction result.',result:'The registry design updates ownership while retaining the link to the original issuance.',from:'wallet',to:'network',route:'M260 280 H300 Q320 280 320 260 V220 Q320 200 340 200 H830 Q850 200 850 180 V160',kind:'value',tag:'Permitted credit transfer',status:'Holding updated'},
  {title:'Retire credits',action:'An authorised user requests retirement with a quantity and reason.',platform:'The target retirement operation connects the registry request to the credit contract under the scheme’s rules.',result:'The retirement record captures the credit, quantity and reason for the final lifecycle action.',from:'app',to:'network',route:'M150 80 V60 Q150 40 170 40 H830 Q850 40 850 60 V80',kind:'request',tag:'Credit retirement instruction',status:'Retirement requested'},
  {title:'Update the registry',action:'The registry user reviews the recorded retirement and credit history.',platform:'Chain events would update the registry workflow with the transaction outcome and retirement state.',result:'The registry record stays connected to the digital credit lifecycle. Environmental claims remain governed by the scheme.',from:'network',to:'service',route:'M850 160 V180 Q850 200 830 200 H520 Q500 200 500 220 V240',kind:'event',tag:'Retirement event & registry update',status:'Retirement recorded'}
 ]
};
