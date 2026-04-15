'use strict';const{Router}=require('express');const e=require('../services/healthmon-engine');const r=Router();
r.post('/v1/healthmon/check',(q,s)=>{const result=e.execute(q.body);s.status(201).json({status:'completed',result})});
r.get('/v1/healthmon/dashboard',(q,s)=>{const rec=e.getRecord(q.params.id||q.params.did);if(!rec)return s.status(404).json({error:'Not found'});s.json(rec)});
r.get('/v1/healthmon/stats',(_,s)=>s.json(e.getStats()));
r.get('/v1/healthmon/records',(_,s)=>s.json({records:e.listRecords()}));
module.exports=r;
