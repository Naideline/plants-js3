(()=>{"use strict";const e={low_light_plants:{toxic:{sansevieria:{name:"Sansevieria",images:{plant:"images/plant-sansevieria.png"},extras:[]}},non_toxic:{boston_fern:{name:"Boston Fern",images:{plant:"images/plant-fern.png"},extras:[]}}},medium_light_plants:{toxic:{aglaonema:{name:"Aglaonema",images:{plant:"images/plant-aglaonema.png"},extras:[]}},non_toxic:{monstera:{name:"Monstera",images:{plant:"images/plant-monstera.png"},extras:[]}}},outdoor_plants:{toxic:{aloe_vera:{name:"Aloe Vera",images:{plant:"images/plant-aloe.png"},extras:[]}},non_toxic:{cactus:{name:"Cactus",images:{plant:"images/plant-cactus.png"},extras:[]}}}},t={composted_soil:"Composted Soil",fertilized_soil:"Fertilized Soil",easy_drainage_soil:"Easy drainage soil"},n={clay_pot:"Clay pot",ceramic_pot:"Ceramic pot"},o={clay:"Clay",blue:"Blue",yellow:"Yellow",pink:"Pink",minimalism:"Minimalism"};function a(){const a=document.getElementById("plantForm"),i=new FormData(a),l=i.get("placement"),s=i.get("sunlight"),m=i.get("pets"),c=i.get("watering"),r=i.get("style"),p=i.getAll("extra_elements");let d,g;if("inside_indirect"===l&&"no"===s&&"no"===m?(d="low_light_plants",g="toxic"):"inside_indirect"===l&&"no"===s&&"yes"===m?(d="low_light_plants",g="non_toxic"):"inside_indirect"===l&&"yes"===s?(d="medium_light_plants",g="non_toxic"):"inside_direct"===l?(d="medium_light_plants",g="toxic"):"outside"===l&&(d="outdoor_plants",g="toxic"),d&&g){const a=function(a,i,l,s,m,c){const r=e[a][i],p=Object.keys(r);if(p.length>0){const e={...r[p[0]]};return e.soil=t["overwater"===l?"easy_drainage_soil":"yes"===c?"composted_soil":"fertilized_soil"],e.details={pot:n["overwater"===l?"clay_pot":"ceramic_pot"],color:o["minimalism"===s?"clay":"simple_decoration"===s?"blue":"lots_decoration"===s?"yellow":"pink"],extras:m},e}return null}(d,g,c,r,p,s);a&&(function(e){localStorage.setItem("plantRecommendation",JSON.stringify(e))}(a),function(e,t,n,o){const a=document.getElementById("plantRecommendation"),i=document.getElementById("plantName"),l=document.getElementById("plantImage"),s=document.getElementById("potImage"),m=document.getElementById("soilBagImage"),c=document.getElementById("potType"),r=document.getElementById("soilType"),p=document.getElementById("potColor"),d=document.getElementById("extrasList"),g=document.getElementById("extrasImageContainer");i.textContent=e.name,l.src=e.images.plant,r.textContent=`Soil: ${e.soil}`,c.textContent=`Pot: ${e.details.pot}`,p.textContent=`Color: ${e.details.color}`;const u="yes"===t?"images/soil-composted.png":"images/soil-fertilized.png";let y="";"overwater"===o?y="images/clay-pot.png":"underwater"!==o&&"neither"!==o||(y="images/ceramic-pot.png");y="Ceramic Pot"===potType?"yes"===t?"images/simple-ceramic-pot.png":"images/simple-ceramic-pot-decorated.png":"Clay Pot"===potType||"minimalism"===n?"images/simple-clay-pot.png":"simple_decoration"===n?"images/simple-clay-pot-decorated.png":"lots_decoration"===n?"images/painted-clay-pot-decorated.png":"images/simple-ceramic-pot.png";m.src=u,s.src=y,g.innerHTML="",e.details.extras.forEach((e=>{const t=document.createElement("img"),n=`images/${e}.png`.replace(/_/g,"-");t.src=n,t.alt=e,g.appendChild(t)})),d.innerHTML="",e.details.extras.length>0?e.details.extras.forEach((e=>{const t=document.createElement("p"),n={moss_pole:"Moss Pole",pebbles:"Pebbles",smaller_plants:"Smaller Plants"}[o=e]||o;var o;t.textContent=n,d.appendChild(t)})):d.textContent="None";a.style.display="block"}(a,s))}}document.getElementById("getButton").addEventListener("click",(function(){(function(){const e=document.getElementById("plantForm"),t=new FormData(e),n=["placement","sunlight","pets","watering","style"];for(const e of n)if(!t.get(e))return!1;return!0})()&&(a(),document.getElementById("customizeButton").style.display="block")})),document.getElementById("customizeButton").addEventListener("click",(function(){window.location.href="customize.html"})),document.getElementById("clearButton").addEventListener("click",(function(){document.getElementById("plantForm").reset(),document.getElementById("plantRecommendation").style.display="none"}))})();