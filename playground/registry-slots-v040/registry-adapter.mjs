// IP-063: ORIGINAL curated Registry metadata adapter, no module imports from vendor registries.
import {BLOCK_DEFS,seedBlocks,validateBlocks} from "../visual-editor-v039/block-schema.mjs";
const catalog=Object.freeze({
 "fixture.hero":{label:"Hero / 标题区块",type:"hero",source:"original-fixture-v040"},
 "fixture.feature":{label:"Feature / 功能描述",type:"feature",source:"original-fixture-v040"},
 "fixture.quote":{label:"Quote / 引言",type:"quote",source:"original-fixture-v040"}
});
const safeId=id=>typeof id==="string"&&/^[a-z][a-z0-9-]{1,49}$/.test(id);
const record=v=>v!==null&&typeof v==="object"&&!Array.isArray(v);
export function listCuratedMappings(){
 return Object.entries(catalog).map(([sourceId,c])=>({sourceId,label:c.label,localType:c.type,source:c.source,status:"original-fixture-only"}));
}
export function mapRegistryIntent(intent){
 if(!record(intent)||Object.keys(intent).some(k=>!["sourceId","instanceId","props"].includes(k)))throw Error("Unknown registry intent field");
 const {sourceId,instanceId,props={}}=intent;
 if(typeof sourceId!=="string"||!Object.hasOwn(catalog,sourceId))throw Error("Unreviewed registry source");
 if(!safeId(instanceId))throw Error("Invalid instance ID");
 if(!record(props))throw Error("Props must be a plain record");
 const type=catalog[sourceId].type;
 const allowed=BLOCK_DEFS[type].fields;
 if(Object.keys(props).some(k=>!Object.hasOwn(allowed,k)))throw Error("Unknown mapped prop");
 const defaults=seedBlocks().find(x=>x.type===type).props;
 const node={id:instanceId,type,props:{...defaults,...props},slots:{}};
 validateBlocks([node]);
 return node;
}
export function inspectExternalRegistry(descriptor){
 if(!record(descriptor)||typeof descriptor.name!=="string"||!descriptor.name.trim())throw Error("Invalid external descriptor");
 return {name:descriptor.name.slice(0,100),status:"requires-item-level-license-and-schema-review",executable:false,importable:false,sourceCodeCopied:false};
}
