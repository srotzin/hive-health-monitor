'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3026;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/healthmon'));
app.get('/',(_,r)=>r.json({service:'hive-health-monitor',version:'1.0.0',description:'Infrastructure health monitoring — uptime, latency, anomaly detection, alerting',endpoints:{"check":"POST /v1/healthmon/check","dashboard":"GET /v1/healthmon/dashboard","stats":"GET /v1/healthmon/stats","records":"GET /v1/healthmon/records","health":"GET /health","pulse":"GET /.well-known/hive-pulse.json"}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-health-monitor] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
